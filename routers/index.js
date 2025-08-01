import { Router } from "express";
import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const ec2 = new AWS.EC2();
const instanceId = process.env.EC2_INSTANCE_ID;

const router = Router();

router.get("/", async (req, res) => {
  try {
    const data = await ec2
      .describeInstances({ InstanceIds: [instanceId] })
      .promise();

    const state = data.Reservations[0].Instances[0].State.Name;

    res.render("index", { state });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao obter status da instância");
  }
});

router.post("/start", async (req, res) => {
  await ec2.startInstances({ InstanceIds: [instanceId] }).promise();
  res.redirect("/");
});

router.post("/stop", async (req, res) => {
  await ec2.stopInstances({ InstanceIds: [instanceId] }).promise();
  res.redirect("/");
});

export default router;
