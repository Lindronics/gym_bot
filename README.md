# Gym Bot

[![AWS CloudFormation deploy](https://github.com/Lindronics/gym_bot/actions/workflows/aws_deploy.yml/badge.svg)](https://github.com/Lindronics/gym_bot/actions/workflows/aws_deploy.yml)
[![Deploy to Firebase Hosting on merge](https://github.com/Lindronics/gym_bot/actions/workflows/firebase-hosting-merge.yml/badge.svg)](https://github.com/Lindronics/gym_bot/actions/workflows/firebase-hosting-merge.yml)

Going to the gym when it is too busy sucks. My local gym has a website that displays the number of current visitors, but no further information.

That's why I wrote a web scraper bot which fetches the number of current visitors from the website every 30 minutes and stores the data in a database for better analysis.

I also wrote a simple web app which can query and display the data on any edge device.

👉 [Link to web app](https://gymbot-6464d.web.app/) 👈

## Architecture

The scraper, DB, and backend are hosted on AWS. The frontend is an Angular web application hosted on Firebase.

All deployments are automated using Github Actions to invoke CloudFormation or Firebase deploy.

![Architecture overview](https://i.ibb.co/p3Rxqjs/architecture.png)
