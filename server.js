import express from 'express';
import { join, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');

const app = express();
const port = process.env.PORT || 3026;

// Security headers middleware
app.use((req, res, next) => {
    // HTTP Strict Transport Security - enforce HTTPS for future requests
    res.setHeader('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');

    // Clickjacking protection
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');

    // MIME sniffing
    res.setHeader('X-Content-Type-Options', 'nosniff');

    // Referrer policy
    res.setHeader('Referrer-Policy', 'no-referrer-when-downgrade');

    // Permissions-Policy (former Feature-Policy) - disable powerful features
    res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=(), browsing-topics=()');

    // Cross-origin policies
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');

    // Content Security Policy
    // We allow styles from self and fonts.googleapis; inline styles are permitted to avoid breaking existing inline CSS.
    const csp = [
        "default-src 'self'",
        "script-src 'self'",
        "style-src 'self' https://fonts.googleapis.com 'unsafe-inline'",
        "font-src 'self' https://fonts.gstatic.com data:",
        "img-src 'self' data:",
        "connect-src 'self'",
        "frame-ancestors 'self'",
        "base-uri 'self'",
        "form-action 'self'"
    ].join('; ');
    res.setHeader('Content-Security-Policy', csp);

    next();
});

app.use(express.static(join(__dirname, 'dist')));

app.get('*', (req, res) => {
    res.sendFile(resolve(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
