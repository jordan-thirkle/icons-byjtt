# Security Policy

## Reporting a vulnerability

Please do not open a public issue for a security vulnerability.

Use GitHub's private security advisory flow for this repository: open **Security** → **Report a vulnerability** and include the affected file or package, reproduction steps, and impact.

Do not include credentials, tokens, private user data, or other sensitive material in public issues, pull requests, or discussions.

## Supported versions

Security fixes are applied to the current supported release line. Older versions may not receive security fixes.

## Secret handling

Secrets and credentials must never be committed to this repository. Use GitHub Actions secrets, OIDC/trusted publishing, or the relevant provider's secure secret store instead.
