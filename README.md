# stellar-testkit-cli

A CLI tool for testing and debugging on the Stellar testnet.
Built on top of [stellar-testkit-core](https://github.com/stellar-devtools/stellar-testkit-core),
it lets you fund accounts, check balances, and inspect transactions
directly from your terminal — no code required.

## Installation

```bash
npm install -g stellar-testkit-cli
```

## Usage

### Fund a Testnet Account

```bash
stellar-testkit fund YOUR_PUBLIC_KEY
```

Account YOUR_PUBLIC_KEY funded successfully!

### Check Account Balance

```bash
stellar-testkit balance YOUR_PUBLIC_KEY
```

📊 Account Balances:
XLM: 10000.0000000

### Inspect a Transaction

```bash
stellar-testkit inspect YOUR_TX_HASH
```

📜 Transaction Details:
ID: abc123...
Created At: 2026-04-12T10:00:00Z
Fee Charged: 100 stroops
Operations: 1
Successful: Yes

### Help

```bash
stellar-testkit --help
```

## Requirements

- Node.js v16 or higher
- A Stellar testnet keypair (generate one at https://laboratory.stellar.org)

## Development

```bash
# Clone the repo
git clone https://github.com/stellar-devtools/stellar-testkit-cli.git
cd stellar-testkit-cli

# Install dependencies
npm install

# Build
npm run build

# Run locally
node dist/index.js --help
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feat/your-feature`)
3. Make your changes
4. Commit your changes (`git commit -m "feat: add your feature"`)
5. Push to the branch (`git push origin feat/your-feature`)
6. Open a Pull Request

Please make sure your code builds without errors before submitting a PR.

## Related

- [stellar-testkit-core](https://github.com/stellar-devtools/stellar-testkit-core) — The underlying SDK this CLI is built on

## License

MIT © [stellar-devtools](https://github.com/stellar-devtools)
