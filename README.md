# Next.js SaaS Scaffold

Production-ready Next.js 15 SaaS platform with authentication, billing, and all the stuff you need to actually ship a product.

**Built by [Augustus Rivers](https://offlabel.design)** - because I got tired of rebuilding the same boilerplate every time.

## What's Included

- **Authentication** - NextAuth.js with Google, GitHub, and email
- **Stripe Billing** - Subscriptions, webhooks, customer portal
- ️ **Database** - Prisma ORM with PostgreSQL
- **UI Components** - Tailwind CSS with Radix UI primitives
- **Responsive** - Mobile-first design
- **Testing** - Jest setup ready to go
- **Deployment** - Docker config and deployment docs
- **Analytics Ready** - Easy to plug in your analytics

## Getting Started

```bash
# Clone and install
git clone https://github.com/offlabel-scaffolds/scaffold-nextjs-saas.git
cd scaffold-nextjs-saas
npm install

# Setup environment
cp .env.example .env
# Edit .env with your actual values

# Setup database
npx prisma db push
npx prisma generate

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and you're good to go.

## Environment

### Database

You'll need a PostgreSQL database. Quick options:

- **Local**: Install PostgreSQL locally (boring but works)
- **Vercel Postgres**: Free tier, super easy
- **Supabase**: Also has a generous free tier
- **Neon**: Serverless Postgres, pretty slick

Update `DATABASE_URL` in your `.env` file.

### OAuth Providers

**Google:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create OAuth 2.0 credentials
3. Add authorized redirect: `http://localhost:3000/api/auth/callback/google`
4. Copy client ID and secret to `.env`

**GitHub:**
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create new OAuth App
3. Callback URL: `http://localhost:3000/api/auth/callback/github`
4. Copy client ID and secret to `.env`

### Stripe

1. Create account at [Stripe](https://stripe.com)
2. Get API keys from dashboard
3. Create products and pricing
4. Add price IDs to `.env`
5. Setup webhook endpoint (see docs/STRIPE.md)

## Project Structure

```
src/
├── app/ # Next.js 15 app directory
│ ├── api/ # API routes
│ ├── auth/ # Auth pages
│ └── dashboard/ # Protected dashboard
├── components/ # React components
│ ├── ui/ # Base UI components
│ └── auth/ # Auth-related components
├── lib/ # Utilities and configs
│ ├── auth/ # Auth configuration
│ ├── stripe/ # Stripe utilities
│ └── db.ts # Database client
└── types/ # TypeScript types
```

## Scripts

```bash
npm run dev # Start development server
npm run build # Build for production
npm run start # Start production server
npm run lint # Run ESLint
npm run type-check # Run TypeScript compiler
npm test # Run tests
```

## Database Commands

```bash
npx prisma db push # Push schema changes
npx prisma generate # Generate Prisma Client
npx prisma studio # Open database GUI
npx prisma migrate dev # Create migration (production)
```

## Deployment

See [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md) for detailed deployment instructions.

Quick deploy options:
- **Vercel** - Easiest, one-click deploy
- **Railway** - Also stupid simple
- **Docker** - Dockerfile included
- **Any Node.js host** - It's just a Next.js app

## Customization

This is a scaffold, not a framework. You're supposed to customize it:

- Replace the landing page content
- Add your own brand colors in `tailwind.config.js`
- Customize the Prisma schema for your data model
- Add your own pages and features
- Make it yours!

## Common Issues

**Database connection errors:**
- Check your `DATABASE_URL` is correct
- Make sure your database allows connections from your IP
- Run `npx prisma db push` to sync the schema

**OAuth not working:**
- Double-check your callback URLs match exactly
- Make sure environment variables are set
- In production, update OAuth app with production URLs

**Stripe webhooks failing:**
- Use Stripe CLI for local testing: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
- Verify webhook secret is correct
- Check webhook logs in Stripe dashboard

## Documentation

- [Architecture](./docs/ARCHITECTURE.md) - System design and patterns
- [Development](./docs/DEVELOPMENT.md) - Development workflow and guidelines
- [Deployment](./docs/DEPLOYMENT.md) - Production deployment guide
- [Stripe Integration](./docs/STRIPE.md) - Stripe setup and webhooks

## Contributing

Found a bug? Have an idea? PRs welcome!

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## License

MIT License - see [LICENSE](./LICENSE)

Built with ️ by Augustus Rivers at [Offlabel Design](https://offlabel.design)

Questions? Email: hello@offlabel.design

## Docker Support

```bash
# Build and run with Docker Compose
docker-compose up
```

## Deployment

See [deployment guide](./docs/DEPLOYMENT.md) for production deployment instructions.

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

## License

MIT License - see [LICENSE](./LICENSE) file for details.

## Related Scaffolds

Part of the [SaaSy Scaffold Library](https://github.com/ajibear?tab=repositories&q=scaffold) - 47+ production-ready templates for any project.

---

**Author:** [Augustus Rivers](https://offlabel.design) 
**Website:** https://offlabel.design 
**Email:** hello@offlabel.design 
**Created:** October 02, 2025 
**License:** MIT

## Support

For questions, issues, or contributions:
- Open an issue in this repository
- Visit [offlabel.design](https://offlabel.design)
- Email: hello@offlabel.design

---

*This scaffold is maintained as part of the Offlabel Design framework for modern application development.*
