'use strict';
const Issue = require('../models/Issue')

module.exports = function (app) {

  app.route('/api/issues/:project')

    .get(async function (req, res) {
      let queryObject = { project: req.params.project };
      let filters = ['open', 'issue_title', 'issue_text', 'created_by', 'assigned_to', 'status_text']

      for (let filter of filters) {
        if (req.query[filter]) {
          queryObject[filter] = req.query[filter]
        }
      }

      const issues = await Issue.find(queryObject).select('-__v -project')
      return res.json(issues)
    })

    .post(async function (req, res) {
      let project = req.params.project;

      try {
        let data = req.body
        data.project = project
        const issue = await Issue.create(data)
        issue.project = undefined;
        issue.__v = undefined;

        return res.json(issue)
      } catch (error) {
        return res.json({ error: 'required field(s) missing' })
      }
    })

    .put(async function (req, res) {

      if (!req.body._id) return res.json({ error: 'missing _id' })

      try {
        let body = { ...req.body };
        delete body._id;
        if (Object.keys(body).length == 0)
          return res.json({ error: 'no update field(s) sent', _id: req.body._id })

        const issue = await Issue.findById(req.body._id);
        let { issue_title, issue_text, created_by, assigned_to, status_text, created_on, open } = issue

        body = { issue_title, issue_text, created_by, assigned_to, status_text, created_on, open, ...body };

        body.project = req.params.project;
        body.updated_on = Date.now();

        await Issue.validate(body);

        for (let i in body) {
          issue[i] = body[i];
        }
        await issue.save();

        return res.json({ result: 'successfully updated', _id: req.body._id })

      } catch (err) {
        return res.json({ error: 'could not update', _id: req.body._id })
      }

    })

    .delete(async function (req, res) {
      let project = req.params.project;

      if (!req.body._id) return res.json({ error: 'missing _id' })

      try {
        const issue = await Issue.findById(req.body._id);
        await issue.delete();
        return res.json({ result: 'successfully deleted', '_id': req.body._id })
      } catch (err) {
        return res.json({ error: 'could not delete', '_id': req.body._id });
      }
    });

};
