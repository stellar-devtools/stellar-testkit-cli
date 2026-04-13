#!/usr/bin/env node
import { Command } from "commander";
import chalk from "chalk";
import {
  fundAccount,
  checkBalance,
  inspectTransaction,
} from "stellar-testkit-core";

const program = new Command();

program
  .name("stellar-testkit")
  .description("CLI toolkit for testing and debugging on the Stellar testnet")
  .version("0.1.0");

program
  .command("fund <publicKey>")
  .description("Fund a Stellar testnet account via Friendbot")
  .option("--json", "Output result as JSON")
  .action(async (publicKey: string, options: { json?: boolean }) => {
    try {
      await fundAccount(publicKey);
      if (options.json) {
        console.log(JSON.stringify({ success: true, publicKey }));
      } else {
        console.log(chalk.green(`✅ Account funded successfully: ${publicKey}`));
      }
    } catch (error: any) {
      if (options.json) {
        console.log(JSON.stringify({ success: false, error: error.message }));
      } else {
        console.log(chalk.red(`❌ ${error.message}`));
      }
      process.exit(1);
    }
  });

program
  .command("balance <publicKey>")
  .description("Check the balance of a Stellar testnet account")
  .option("--json", "Output result as JSON")
  .action(async (publicKey: string, options: { json?: boolean }) => {
    try {
      const balances = await checkBalance(publicKey);
      if (options.json) {
        console.log(JSON.stringify(balances));
      } else {
        console.log(chalk.cyan("\n📊 Account Balances:"));
        balances.forEach((b) => {
          console.log(chalk.white(`  ${b.asset}: ${b.balance}`));
        });
      }
    } catch (error: any) {
      if (options.json) {
        console.log(JSON.stringify({ success: false, error: error.message }));
      } else {
        console.log(chalk.red(`❌ ${error.message}`));
      }
      process.exit(1);
    }
  });

program
  .command("inspect <txHash>")
  .description("Inspect a transaction on Stellar testnet")
  .option("--json", "Output result as JSON")
  .action(async (txHash: string, options: { json?: boolean }) => {
    try {
      const tx = await inspectTransaction(txHash);
      if (options.json) {
        console.log(
          JSON.stringify({
            id: tx.id,
            createdAt: tx.createdAt,
            feeCharged: tx.feeCharged,
            operationCount: tx.operationCount,
            successful: tx.successful,
          })
        );
      } else {
        console.log(chalk.cyan("\n📜 Transaction Details:"));
        console.log(chalk.white(`  ID:          ${tx.id}`));
        console.log(chalk.white(`  Created At:  ${tx.createdAt}`));
        console.log(chalk.white(`  Fee Charged: ${tx.feeCharged} stroops`));
        console.log(chalk.white(`  Operations:  ${tx.operationCount}`));
        console.log(
          chalk.white(
            `  Successful:  ${tx.successful ? chalk.green("Yes") : chalk.red("No")}`
          )
        );
      }
    } catch (error: any) {
      if (options.json) {
        console.log(JSON.stringify({ success: false, error: error.message }));
      } else {
        console.log(chalk.red(`❌ ${error.message}`));
      }
      process.exit(1);
    }
  });

program.parse(process.argv);
