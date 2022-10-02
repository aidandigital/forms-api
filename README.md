# Form Submission API

## Description
Anytime you submit a form on my website, the request is processed via AWS API Gateway and proxied to an AWS Lambda function. The function validates and sanitizes the payload which is then sent through an AWS SES (simple email service) template. The email template is not visible.

## Tech used
* AWS
* Node.js®
* HTML/CSS

## Features
* REST API resource defined using AWS API Gateway which proxies all requests to a custom AWS Lambda function.
* Custom validation depending on which form is being submitted.
* Sanitation and encoding to prevent XSS.
* Custom AWS SES email template using HTML/CSS. Plain-text support for email clients that don't allow HTML.