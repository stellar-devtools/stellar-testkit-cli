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
  .action(async (publicKey: string) => {
    try {
      await fundAccount(publicKey);
    } catch (error: any) {
      console.log(chalk.red(`❌ ${error.message}`));
    }
  });

program
  .command("balance <publicKey>")
  .description("Check the balance of a Stellar testnet account")
  .action(async (publicKey: string) => {
    try {
      const balances = await checkBalance(publicKey);
      console.log(chalk.cyan("\n📊 Account Balances:"));
      balances.forEach((b) => {
        console.log(chalk.white(`  ${b.asset}: ${b.balance}`));
      });
    } catch (error: any) {
      console.log(chalk.red(`❌ ${error.message}`));
    }
  });

program
  .command("inspect <txHash>")
  .description("Inspect a transaction on Stellar testnet")
  .action(async (txHash: string) => {
    try {
      const tx = await inspectTransaction(txHash);
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
    } catch (error: any) {
      console.log(chalk.red(`❌ ${error.message}`));
    }
  });

program.parse(process.argv);