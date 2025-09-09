# Multi-Tenancy Strategy

This document outlines the architectural approach to isolating tenant data within the Business Logic API.

## 1. Multi-Tenancy Model

We will be implementing a **Shared Database, Shared Schema** multi-tenancy model.

* **Shared Database:** All tenant data will reside within a single PostgreSQL database instance.
* **Shared Schema:** All tenants will share the same set of tables (e.g., `Users`, `Projects`, `Resources`).

This model was chosen for its cost-effectiveness, ease of management, and scalability for a growing number of tenants. It offers a good balance between data isolation and resource utilization.

## 2. Tenant Identification and Isolation

The core of our multi-tenancy strategy is to enforce data isolation at the application level.

### Tenant Identifier

The `Organization` entity serves as the primary tenant. Every relevant database table (e.g., `Users`, `Projects`, `Resources`, and any future related entities) will include a required `organizationId` column.

### Data Access Control

Data isolation will be strictly enforced through middleware and database queries.

1.  **Request Authentication:** Upon a user logging in, a unique JSON Web Token (JWT) will be generated. This token will contain the user's `id` and their associated `organizationId`. This token must be included in the headers of every subsequent API request.

2.  **Middleware Validation:** A dedicated Express middleware will intercept all protected API routes. This middleware will perform two checks:
    * **Authentication:** Verify the JWT is valid and not expired.
    * **Tenant Context:** Extract the `organizationId` from the JWT and attach it to the request object (e.g., `req.user.organizationId`).

3.  **Database Query Enforcement:** All database queries for fetching, creating, updating, or deleting data will be required to include a `WHERE` clause that filters by the `organizationId` from the request context.

**Example Query (Conceptual):**

```sql
-- Fails: This query could return data for multiple organizations
SELECT * FROM Projects WHERE id = 'some-project-id';

-- Correct: This query ensures data is limited to the current tenant
SELECT * FROM Projects
WHERE id = 'some-project-id'
AND organizationId = req.user.organizationId;