import {Types} from "mongoose"

export enum TransactionType {
     sale = "sale",
        refund = "refund",
        withdrawal = "withdrawal",
        deposit = "deposit",
}

export enum TransactionStatus {
        pending = "pending",
        completed = "completed",
        failed = "failed",
        cancelled = "cancelled",
}

export interface ITransaction {
    id: string;
    transactionType: TransactionType;
    amount: number;
    currency: string;
    status: TransactionStatus;
    withdrawalId?: string; 
    date: Date;
}

export interface IWallet {
    _id: Types.ObjectId
    seller: Types.ObjectId;
    balance: number;
    currency: string;
    transactionHistory: ITransaction[];
    createdAt: Date;
    updatedAt: Date;
}

export enum paymobIssuar {
    BANK_CARD = "bank_card",
    INSTANT_BANK = "instant_bank"
}

export enum paymobBankCode {
    CIB = "CIB",
    MISR = "MISR",
    NBE = "NBE",
    QNB = "QNB",
    AAIB = "AAIB",
    HSBC = "HSBC",
    SGB = "SGB",
    BOB = "BOB",
    FNB = "FNB",
    ALEXBANK = "ALEXBANK",
    SAIB = "SAIB",
    BANQUE_MISR = "BANQUE_MISR",
}

export enum BankAccountStatus{
    PENDING_VERIFICATION = "pending_verification",
    VERIFIED = "verified",
    REJECTED = "rejected",
}

export interface IBankAccount {
    issuer: paymobIssuar;
    fullName: string;
    bankCardNumber: string; 
    last4: string;
    bankCode: paymobBankCode;
    status: BankAccountStatus;
}