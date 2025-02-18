"use server";
import { prisma } from "./connect-db";
import { signIn } from "./auth";

export const RegisterUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    if (!data.password) throw new Error("Invalid Credentials");

    const response = await fetch(
      `${process.env.BASE_URL}/api/encryption/hash`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: data.password,
        }),
      }
    );

    data.password = await response.json();

    await prisma.user.create({
      data,
    });
  } catch (error) {
    throw new Error(error as string);
  }
};

export const signUser = async (data: { email: string; password: string }) => {
  try {
    await signIn("credentials", {
      redirect: false,
      ...data,
    });
  } catch (error) {
    if (error) throw new Error(error as string);
  }
};

export const makePayment = async (data: {
  accountNumber: string;
  amount: string;
  currency: string;
  externalId: string;
  provider: string;
  serviceId: string;
  userId: string;
}) => {
  try {
    const res = await fetch(
      "https://sandbox.azampay.co.tz/azampay/mno/checkout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + process.env.AZAMPAYTOKEN,
          "X-API-Key": "API-KEY",
        },
        body: JSON.stringify({
          accountNumber: data.accountNumber,
          amount: data.amount,
          currency: data.currency,
          externalId: data.externalId,
          provider: data.provider,
        }),
      }
    );

    console.log("response", res.status);

    // if (response.status !== 200)
    //   throw new Error("Payment failed, please try again");

    // const paymentStatus = await fetch(
    //   `/azampay/gettransactionstatus?pgReferenceId=${`transactionId`}&bankName=${
    //     data.provider
    //   }`,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${process.env.AZAMPAYTOKEN}`,
    //     },
    //   }
    // );

    // if (paymentStatus.status !== 200)
    //   throw new Error("Payment failed, please try again");

    // console.log(paymentStatus.json());
    // await prisma.transaction.create({
    //   data: {
    //     accountNumber: data.accountNumber,
    //     amount: Number(data.amount),
    //     currency: data.currency,
    //     referenceId: data.externalId,
    //     provider: data.provider as Providers,
    //     status: response.status === 200 ? "SUCCESS" : "FAILED",
    //     serviceId: data.serviceId,
    //     userId: data.userId,
    //   },
    // });
  } catch (error) {
    throw new Error(error as string);
  }
};
