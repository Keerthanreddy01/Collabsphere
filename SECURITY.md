# Security Policy

## Reporting a Vulnerability

**DO NOT** open a public GitHub issue for security vulnerabilities. Public disclosure of unpatched vulnerabilities can put the entire community at risk.

### Responsible Disclosure

If you discover a security vulnerability in Collabsphere, please report it responsibly:

1. **Go to GitHub Security Advisory:**
   - Visit: https://github.com/Keerthanreddy01/Collabsphere/security/advisories/new
   - Click "Draft a security advisory"

2. **Provide Details:**
   - **Title:** Brief description of the vulnerability
   - **Description:** Detailed explanation of the issue
   - **CWE ID:** Common Weakness Enumeration (if known)
   - **CVSS Score:** CVSS v3.1 score (if known)
   - **Affected versions:** Which releases/tags are affected
   - **Patched versions:** When will it be fixed
   - **Workarounds:** Temporary solutions for users

3. **Optionally Include:**
   - Proof of concept (PoC) code
   - Steps to reproduce
   - Impact assessment

### Timeline

We aim to:
- **Acknowledge** receipt within 24 hours
- **Confirm** the vulnerability within 48 hours
- **Release a patch** within 2 weeks (for critical issues)
- **Publicly disclose** once a patch is released

If you don't hear from us within 48 hours, you may escalate to the GitHub Security Team.

### What NOT to Do

❌ **DO NOT:**
- Post the vulnerability in public GitHub issues
- Share exploit code publicly
- Disclose on social media or forums
- Contact random maintainers (use the security advisory)
- Demand a specific timeline (we work as fast as possible)

### Security Contact

- **Primary:** Security advisory (preferred)
- **Email:** security@collabsphere.com
- **GitHub:** [Open a private security advisory](https://github.com/Keerthanreddy01/Collabsphere/security/advisories)

---

## Supported Versions

Security updates are provided for:

| Version | Supported Until | Status |
|---------|-----------------|--------|
| 1.0+    | 2027-01-01      | ✅ Active |
| < 1.0   | N/A             | ❌ Legacy (no patches) |

## Security Scope

### In Scope

We take the following seriously:

- **Authentication vulnerabilities** — Session hijacking, auth bypass
- **Authorization issues** — Privilege escalation, unauthorized access
- **Data exposure** — Leaking user data or secrets
- **Injection attacks** — SQL injection, XSS, command injection
- **Dependency vulnerabilities** — Known CVEs in npm packages
- **Cryptography issues** — Weak encryption, improper key handling
- **Infrastructure** — Server misconfiguration, exposed credentials

### Out of Scope

The following are **not** security issues:

- **Social engineering** — Phishing attacks against users
- **Denial of Service** — Rate limiting, resource exhaustion (use GitHub Issues instead)
- **Missing features** — "Security would be better if..." (use Feature Requests)
- **Third-party vulnerabilities** — Bugs in external services we depend on
- **User configuration errors** — Setting weak passwords, exposing API keys
- **Physical security** — Compromised machines running the app

### Recommendations

To use Collabsphere securely:

1. **Keep updated** — Always use the latest version
2. **Manage secrets** — Use environment variables, never hardcode API keys
3. **Use HTTPS** — Always communicate over encrypted connections
4. **Validate input** — The API should validate all user input
5. **Rotate tokens** — Refresh authentication tokens regularly
6. **Monitor logs** — Watch for suspicious activity
7. **Principle of least privilege** — Give minimal required permissions
8. **Dependency scanning** — Run `npm audit` regularly

---

## Security Best Practices for Contributors

When contributing code:

- ✅ **Never commit secrets** — Use `.env.example` for placeholders
- ✅ **Validate user input** — Always validate and sanitize
- ✅ **Use parameterized queries** — Prevent SQL injection
- ✅ **Keep dependencies updated** — Regular `npm audit` checks
- ✅ **Use environment variables** — For sensitive configuration
- ✅ **Review dependencies** — Check what you're adding to package.json
- ✅ **Avoid hardcoding** — API URLs, tokens, credentials

---

## Acknowledgments

We appreciate security researchers who responsibly disclose vulnerabilities and help us keep Collabsphere secure.

Researchers who report valid vulnerabilities may be:
- Credited in security advisories
- Listed in our security hall of fame (with permission)
- Recognized in release notes

---

**Thank you for helping keep Collabsphere secure!**
