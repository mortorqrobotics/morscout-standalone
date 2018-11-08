import express from 'express';
import Models from 'models';


export default ({
  mongoose,
}) => {
  const {
    Teams,
  } = Models({ mongoose });
  const app = express.Router();
  app.get('/teams', async (req, res) => {
    res.send(JSON.stringify(Teams.getList()));
  });
  app.get('/team/:id', async (req, res) => {
    res.send();
  });
  return app;
};
