# RFC: Bring Your Own Key for Sourcegraph AI

- **Status:** Proposed
- **Authors:** Sourcegraph AI Platform
- **Date:** 2026-09-12
- **Decision requested:** Approve the MVP described below.

## Summary

Enable Sourcegraph Enterprise customers to configure their own credentials for
supported large language model (LLM) providers and use those credentials for
Sourcegraph AI features. In the initial release, an instance administrator
configures an Anthropic API key; Sourcegraph routes eligible AI requests through
the existing Model Provider interface, but authenticates to Anthropic with the
customer's key rather than Sourcegraph's hosted-service credentials.

This gives regulated and strategically important customers control over their
LLM vendor relationship, billing, regional commitments, and usage limits
without requiring a separate AI product or a fork of Cody's feature surface.

## Background

Today, Sourcegraph AI features access Anthropic, OpenAI, and Google models
through Sourcegraph Model Provider, a hosted service backed by Sourcegraph's
vendor relationships. Customers consume Sourcegraph credits as they use these
features. This model provides a fast, integrated onboarding path: Sourcegraph
operates provider access, selects supported models, applies product safeguards,
and presents a consistent experience across the instance and IDE clients.

The hosted model is not acceptable for every customer. For example, a
fictional financial-services customer, Northstar Bank, requires all AI vendor
contracts, invoices, data-processing terms, and model-usage controls to remain
under its procurement and security organization. Its procurement team will
approve Anthropic usage only when the bank owns the API account and can audit
the resulting spend directly. Similar requirements occur in healthcare, public
sector, and highly regulated enterprises.

Those customers can self-host models or avoid AI entirely, but neither outcome
delivers the Code Search- and repository-aware workflows that differentiate
Sourcegraph AI. We need a supported path that preserves the product integration
while allowing customers to supply the credential used for inference.

## Problem

Enterprise administrators cannot currently use Sourcegraph AI with a
customer-owned LLM-provider account. This blocks adoption when a customer must:

- contract directly with the LLM provider;
- pay the provider directly rather than spend Sourcegraph credits;
- enforce its own provider account limits, model access, and regional settings;
- retain provider-native audit and usage records; or
- rotate or revoke AI credentials on its own security schedule.

The absence of BYOK makes Sourcegraph AI an all-or-nothing procurement choice.
It also encourages unsupported credential injection or separate developer tools
that lack Sourcegraph's code intelligence and governance controls.

## Goals

- Let an instance administrator enable AI inference using a customer-managed
  provider credential.
- Keep Cody and other Sourcegraph AI workflows unchanged for end users while a
  valid BYOK credential is active; make provider failures clearly
  administrator-actionable rather than silently changing billing mode.
- Preserve Sourcegraph's repository context, permission filtering, telemetry
  controls, and abuse safeguards.
- Ensure credentials are encrypted, never returned after submission, redacted
  from logs, and removable immediately.
- Establish a provider-neutral configuration and routing model that can grow to
  OpenAI and Google.

## Non-goals

- Supporting arbitrary OpenAI-compatible endpoints, local model servers, or
  customer-written provider adapters in the MVP.
- Rebuilding each provider's account administration, invoices, quotas, or audit
  views in Sourcegraph.
- Mixing a customer's key with Sourcegraph credits for the same request.
- Guaranteeing access to a model that is unavailable to the customer's provider
  account or region.
- Changing Sourcegraph's data-use, repository authorization, or AI feature
  policies.

## Proposal

### Configuration

Add an instance-level **AI provider credentials** setting available only to
site administrators. The setting supports a credential record containing:

- provider (`anthropic` in the MVP);
- encrypted secret value;
- enabled state;
- creation, last-update, and last-validation timestamps;
- a non-secret credential label or fingerprint for administrator recognition;
- an optional model allowlist, restricted to Sourcegraph-supported models.

The write API accepts a secret only when creating or rotating a credential. Read
APIs return metadata, never the secret. Sourcegraph stores the secret using the
instance's existing encrypted-secret facility; it must not be persisted in
plaintext configuration, browser storage, client logs, diagnostics, or
telemetry. Deleting or disabling a credential immediately prevents new requests
from using it.

Administrators can run a connection validation that makes a minimal,
non-repository request to the provider. Validation reports only actionable
status, such as valid, unauthorized, quota-limited, model-not-enabled, or
temporarily unavailable. It does not expose provider response bodies containing
secrets or account data.

### Request routing and billing

Model selection remains controlled by Sourcegraph-supported model aliases.
Before a request leaves Sourcegraph, the model gateway resolves the instance's
active credential:

1. When a valid, enabled BYOK credential exists for the selected provider, the
   gateway uses it for that request.
2. Otherwise, requests use Sourcegraph Model Provider and Sourcegraph credits
   under the existing product behavior.
3. If an enabled BYOK credential is invalid, exhausted, or cannot access the
   requested model, the request fails with a clear administrator-actionable
   error. The gateway does not silently fall back to Sourcegraph credits,
   avoiding unexpected charges and data-routing changes.

Provider token charges for requests authenticated with a customer key are billed
by that provider directly to the customer. Sourcegraph does not consume
inference credits for those requests. Sourcegraph may continue to meter
non-inference product entitlements separately if needed; this will be explicit
in packaging before general availability.

### Product behavior and controls

BYOK changes authentication and billing, not Sourcegraph's AI product
boundaries. The existing request construction, repository-context selection,
authorization checks, client protocol, and feature-level safety controls remain
in place. Provider requests continue to originate from Sourcegraph's gateway,
so provider credentials are never sent to IDE clients or browser sessions.

The instance configuration displays the active provider and the selected
billing mode to administrators. User-facing surfaces can show a generic
"organization-managed AI provider" indicator, but must not reveal provider
account identifiers or credential metadata.

### Operations

Sourcegraph will emit privacy-preserving operational events for configuration
changes, credential validation, routing mode, request outcomes, latency, and
provider error categories. Events must include no credential material and no
repository prompt content. Provider account usage records remain the source of
truth for invoice reconciliation.

Support can inspect credential state and error category through existing
authorized diagnostic tooling, but cannot retrieve credential values. Customer
runbooks will cover initial setup, rotation, validation failures, disabling
BYOK, and emergency revocation.

## MVP

The MVP is an Enterprise instance setting for **one Anthropic API key** and a
supported Anthropic model allowlist. It includes encrypted storage; restricted
administrator APIs and UI; explicit credential validation; deterministic routing
for Anthropic-targeted AI requests; no-credit charging for successful BYOK
inference; secret redaction; immediate disable/delete; and baseline routing,
failure, and latency telemetry.

The MVP intentionally excludes multiple keys per provider, key selection by
user, team, repository, or feature, custom endpoints, provider-side proxy
configuration, automated key rotation, and OpenAI or Google credentials.
The configuration schema and gateway resolver are provider-neutral so adding
those providers is incremental rather than architectural rework.

## Alternatives considered

### Continue with Sourcegraph Model Provider only

This is operationally simplest and retains the strongest centralized experience,
but it leaves regulated customers unable to adopt AI. It does not solve the
customer-owned contract, invoice, or access-control requirements.

### Customer-provided gateway endpoint

Allowing a customer to point Sourcegraph at its own proxy could accommodate many
providers and local models. It greatly expands compatibility, debugging,
networking, and security support obligations, however, and makes request
semantics and safety guarantees inconsistent. This is a potential future
enterprise integration, not an MVP.

### Send provider keys to clients

IDE clients could authenticate directly to a provider. This reduces gateway
responsibility but exposes organization credentials to developer machines,
prevents consistent server-side governance, and fragments behavior across
clients. It is rejected.

### Per-user BYOK

Developer-managed keys are useful for individual experimentation but do not meet
enterprise procurement or audit needs. They also create uneven feature access,
increased support complexity, and an unacceptable credential-management burden.

### Self-hosted models only

Self-hosting is important for some deployments but requires model operations,
capacity planning, performance tuning, and compatibility commitments distinct
from provider-key support. It should remain a separate product track.

## Why Sourcegraph's approach is differentiated

BYOK products commonly act as thin model routers or require developers to
configure credentials in each client. Sourcegraph's proposal lets the enterprise
own LLM procurement while retaining the capabilities customers chose
Sourcegraph for:

- repository-scale code intelligence and precise context retrieval;
- authorization-aware context selection that respects Sourcegraph permissions;
- a single, centrally governed configuration for web, IDE, and API workflows;
- consistent model aliases and AI behavior independent of provider credential
  lifecycle; and
- an operational gateway that keeps high-value provider credentials off user
  devices while giving administrators deterministic billing and routing.

The result is not merely a configurable API client. It combines customer-owned
inference access with Sourcegraph's code graph, search, context, and
enterprise-control layers.

## Success criteria and metrics

The project is successful when eligible Enterprise customers can complete
self-service setup without changing developer workflows, use their own
Anthropic account reliably, and satisfy their procurement and security review.

We will measure:

| Area | Metric | Initial target |
| --- | --- | --- |
| Adoption | Eligible Enterprise instances with a validated BYOK credential within 90 days of availability | 10% |
| Activation | Administrators completing setup and validation without Support intervention | 80% |
| Reliability | Successful BYOK inference requests, excluding provider-declared customer quota/authentication failures | 99.5% monthly |
| Performance | P95 gateway overhead compared with hosted-provider routing | under 150 ms |
| Safety | Confirmed credential disclosures in logs, telemetry, diagnostics, or clients | 0 |
| Commercial impact | Strategic opportunities unblocked or retained because of BYOK | 3 in the first two quarters |
| Experience | BYOK configuration-related support tickets per activated instance in the first 30 days | under 0.2 |

Before general availability, at least one design partner such as Northstar Bank
must validate that the feature meets its direct-provider billing and credential
governance requirements. We will also validate a rotation, revocation, quota
failure, model-access failure, and hosted-routing fallback scenario in staging.

## Rollout

1. Build the provider-neutral credential record, encrypted storage, gateway
   resolver, Anthropic adapter, and operational events behind an instance-level
   feature flag.
2. Run a limited design-partner beta with one to three Enterprise customers and
   collect setup, reliability, and support data.
3. Address operational gaps, publish administrator documentation and runbooks,
   and make the feature generally available for Anthropic.
4. Prioritize OpenAI and Google support based on design-partner demand,
   activation, and commercial impact.

The feature flag provides an immediate rollback path. Disabling BYOK stops
customer-key routing for new requests and returns the instance to its existing
Sourcegraph Model Provider behavior, subject to normal credit availability.

## Risks and mitigations

| Risk | Mitigation |
| --- | --- |
| Credential exposure | Encrypt at rest, redact at every boundary, never return stored values, and keep keys server-side. |
| Unexpected customer cost | Do not silently fall back between BYOK and credit-backed routing; display routing mode and provider failures clearly. |
| Provider model mismatch | Limit selection to Sourcegraph-supported aliases and validate account model access before activation. |
| Support complexity | Start with one provider and one instance-level key; publish diagnostics and runbooks before beta. |
| Reduced observability of spend | Direct customers to provider-native billing while exposing Sourcegraph routing and request-outcome telemetry. |

## Open questions

- What, if any, Sourcegraph AI entitlements should apply when inference credits
  are not consumed?
- Which encrypted-secret and key-management options are supported across
  Sourcegraph deployment modes?
- When should multiple credentials and scoped routing be introduced?
