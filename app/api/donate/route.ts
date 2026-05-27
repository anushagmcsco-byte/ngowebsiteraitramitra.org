import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { donorName, donorPan, email, phone, amount } = await req.json();

    if (!donorName || !amount || amount <= 0) {
      return NextResponse.json(
        { error: "Donor name and a valid donation amount are required." },
        { status: 400 }
      );
    }

    // Interactive 80G Tax Exemption calculation under Indian Income Tax Act:
    // Usually, 50% of the donated amount is eligible for tax deduction.
    const taxDeductibleAmount = amount * 0.50;
    
    // Simulate creating a provisional receipt
    const receiptNumber = `RMST/80G/${new Date().getFullYear()}/${Math.floor(100000 + Math.random() * 900000)}`;
    const date = new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const receipt = {
      receiptNumber,
      date,
      donorName,
      donorPan: donorPan ? donorPan.toUpperCase() : "N/A",
      email,
      phone,
      amount: Number(amount),
      taxDeductibleAmount,
      ngoDetails: {
        name: "Raita Mitra Social Trust (R)",
        address: "#37, First Floor, Pride Icon, Gokul Road, Hubballi – 580030",
        registrationNo: "HBL-4-00006-2021-22",
        pan: "AAETR3286K",
        ngoDarpanId: "KA/2023/0342549",
        csrNo: "CSR00059487",
        approval80G: "Valid AY 2024-25 to 2026-27",
      },
    };

    return NextResponse.json({
      success: true,
      message: `Provisional 80G donation pledge created successfully. Complete your payment online or via bank transfer.`,
      receipt,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
