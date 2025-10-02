import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Customer from '@/models/Customer';

// GET - List all customers
export async function GET() {
  try {
    await dbConnect();
    const customers = await Customer.find({});
    return NextResponse.json(customers);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch customers' },
      { status: 500 }
    );
  }
}

// POST - Add new customer
export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { name, dateOfBirth, memberNumber, interests } = body;

    const customer = new Customer({
      name,
      dateOfBirth,
      memberNumber,
      interests,
    });

    const savedCustomer = await customer.save();
    return NextResponse.json(savedCustomer, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create customer' },
      { status: 500 }
    );
  }
}