---
id: lpi-701-200-08
title: "LPIC-1 · 701-200 — You have a span representing a database query operation. What are…",
slug: lpi-701-200-08-lpic-1-701-200-you-have-a-span-representing-a-database-query
source: "LPI Learning Material — LPIC-1 (Exam 701-200)",
sourceSection: "2. You have a span representing a database query operation. What are three types of metadata, 4. In Grafana Tempo, you notice a spike in request latency. You find a trace where a span for the, 5. You’re using Jaeger to troubleshoot an e-commerce app. You search by service name and find a, 1. You are"
track: linux-engineer,
tier: free
tags: [linux, lpic-1, certification, software-development]
summary: "Payment Gateway takes much longer than others. Covers 6 sections: You have a span representing a database query operation. What are three types of metadata, In Grafana Tempo, you notice .",
---
# LPIC-1 · 701-200 — You have a span representing a database query operation. What are…

## 2. You have a span representing a database query operation. What are three types of metadata
that might be included in this span to help with analysis?

3. A span is generated when Service A sends a request to Service B, and another span is created
when Service B receives it. What are the span kinds for each?

## 4. In Grafana Tempo, you notice a spike in request latency. You find a trace where a span for the
Payment Gateway takes much longer than others. What might be a next step in troubleshooting
the problem?

## 5. You’re using Jaeger to troubleshoot an e-commerce app. You search by service name and find a
trace with multiple spans. One span has status.code = ERROR. What should you look at
next?

## 1. You are investigating a user complaint in a ride-sharing application. The user reports that
confirming a ride took too long. You search for the trace using the user’s request ID and
observe the following in Grafana Tempo:
- The Front End span took 20 ms.
- The Ride Matching Service span took 80 ms.
- The Payment Service span took 3.2 seconds, with a logged event Waiting for external
provider.
- The Notification Service span took 100 ms.
What can you infer from the trace about the root cause of the delay? What follow-up actions
would you take?

## 2. You are tasked with instrumenting a microservice that handles customer orders. It includes the
following actions:
- Receiving the order via HTTP.
- Validating input.
- Writing to a database.
- Sending a confirmation email.
You are using OpenTelemetry with automatic instrumentation for HTTP and database
layers. Which parts of the service might still need manual instrumentation, and what
specific information would you capture in custom spans?

In modern cloud-native and microservices-based architectures, distributed tracing is an essential
observability practice that provides visibility into how requests propagate through complex
systems. Unlike metrics and logs that offer isolated or aggregated views, tracing connects the dots
across services, showing the complete journey of a request in real time.
To implement and analyze traces effectively, tools such as OpenTelemetry, Jaeger, and Grafana
Tempo are widely used. OpenTelemetry provides the standard instrumentation libraries and
propagation mechanisms needed to generate trace data.

1. A request goes through the following services: Front End - Order Service - Payment Service Third-Party Gateway. Each step is tracked using OpenTelemetry. Which OpenTelemetry
concept describes this full request path, and what is the role of each service’s tracking unit?
The full request path is called a trace, and each individual tracking unit within a service is a
span. Together, the trace is composed of spans from the Frontend, Order Service, Payment
Service, and Third-Party Gateway, showing the end-to-end flow.
2. You have a span representing a database query operation. What are three types of metadata
that might be included in this span to help with analysis?
The span might include:
- Tags such as db.system=mysql or db.statement=SELECT * FROM users.
- Start and end timestamps to calculate duration.
- Events such as Query Started or Cache Miss, to give more context during execution.
3. A span is generated when Service A sends a request to Service B, and another span is created
when Service B receives it. What are the span kinds for each?
Service A’s span is of kind CLIENT.
Service B’s span is of kind SERVER.
This helps define directionality and communication roles in the trace.
4. In Grafana Tempo, you notice a spike in request latency. You find a trace where a span for the
Payment Gateway takes much longer than others. What might be a next step in troubleshooting
the problem?
Drill down into the Payment Gateway span to view its events, duration, and status. Check
for tags like error=true or events like Timeout Warning. This helps identify whether the
delay was caused by a network issue, external service delay, or misconfiguration.
5. You’re using Jaeger to troubleshoot an e-commerce app. You search by service name and find a
trace with multiple spans. One span has status.code = ERROR. What should you look at
next?
You should examine:
- The error message or log associated with that span.

- Its parent span, to see what triggered it.
- Its duration, to check whether it timed out.
This analysis will help determine the cause and scope of the failure.

## 1. You are investigating a user complaint in a ride-sharing application. The user reports that
confirming a ride took too long. You search for the trace using the user’s request ID and
observe the following in Grafana Tempo:
- The Front End span took 20 ms.
- The Ride Matching Service span took 80 ms.
- The Payment Service span took 3.2 seconds, with a logged event Waiting for external
provider.
- The Notification Service span took 100 ms.
What can you infer from the trace about the root cause of the delay? What follow-up actions
would you take?
The Payment Service span shows a significant delay (3.2 seconds), especially compared to
other components. The logged event Waiting for external provider indicates that the
issue likely lies with the third-party payment provider.
Follow-up actions include:
- Check the events and status of the Payment Service span for more details.
- Look at the external request latency metrics and retries.
- Coordinate with the external provider to investigate their service availability.
- Consider implementing circuit breakers or fallbacks to reduce user impact in the future.
2. You are tasked with instrumenting a microservice that handles customer orders. It includes the
following actions:
- Receiving the order via HTTP
- Validating input
- Writing to a database
- Sending a confirmation email
You are using OpenTelemetry with automatic instrumentation for HTTP and database
layers. Which parts of the service might still need manual instrumentation, and what
specific information would you capture in custom spans?
The input validation and email sending steps might not be captured by automatic
instrumentation. You should add manual spans for these steps using OpenTelemetry SDKs.

In the custom spans, capture:
- Operation name such as Validate Order, Send Email.
- Tags like validation_result=success or email_provider=SendGrid.
- Events such as Validation Started, Email Dispatched.
- Error status if validation fails or the email service returns an error.
This approach ensures full trace coverage and enables better debugging and visibility into
business logic.

Imprint
© 2026 by Linux Professional Institute: Learning Materials, “DevOps Tools Engineer (Version 2.0)”.
PDF generated: 2026-02-04
This work is licensed under the Creative Commons Attribution-NonCommercial-NoDerivatives 4.0
International License (CC BY-NC-ND 4.0). To view a copy of this license, visit
https://creativecommons.org/licenses/by-nc-nd/4.0/
While Linux Professional Institute has used good faith efforts to ensure that the information and
instructions contained in this work are accurate, Linux Professional Institute disclaims all
responsibility for errors or omissions, including without limitation responsibility for damages
resulting from the use of or reliance on this work. Use of the information and instructions
contained in this work is at your own risk. If any code samples or other technology this work
contains or describes is subject to open source licenses or the intellectual property rights of
others, it is your responsibility to ensure that your use thereof complies with such licenses and/or
rights.
The LPI Learning Materials are an initiative of Linux Professional Institute (https://lpi.org).
Learning Materials and their translations can be found at https://learning.lpi.org.
For questions and comments on this edition as well as on the entire project write an email to:
learning@lpi.org.
