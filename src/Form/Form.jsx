import React from "react";

import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
const Basic = () => {
  const initialValues = {
    buying_legal_fees: 0,
    buying_gov_fees: 0,
    buying_bank_fees: 0,
    current_home_sale_price: 0,
    current_home_loan_amount: 0,
    cost_new_home: 0,
    advertising_cost: 0,
    eighty_loan_amount: 0,
    twenty_loan_amount: 0,
    ten_cheque_amount: 0,
    selling_legal_fees: 0,
    selling_gov_fees: 0,
    selling_bank_fees: 0,
    real_estate_percentage: 0,
    real_estate_fee: 0,
    stamp_duty: 0,
    selling_costs: [
      {
        cost: "",
        amount: 0,
      },
    ],
    additional_cash: [
      {
        description: "",
        amount: 0,
      },
    ],
    total_other_costs: 0,
    total_from_sale: 0,
    total_settlement_amount: 0,
    total_other_cash: 0,
    total_remaining_cash: 0,
  };
  return (
    <div className="bg-gradient-to-t from-blue-400 via-pink-500 to-yellow-500 p-12 ">
      <p className="font-black m-auto text-center text-5xl">
        New Home Calculator
      </p>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          console.log(JSON.stringify(values, null, 2));
        }}
      >
        {({ values, handleChange, setFieldValue }) => {
          const totalOtherSellingCostsArray = [];
          values.selling_costs.map((cost, i) =>
            totalOtherSellingCostsArray.push(cost.amount)
          );
          const totalOtherSellingCosts = totalOtherSellingCostsArray.reduce(
            (a, b) => a + b,
            0
          );
          const totalOtherCashArray = [];
          values.additional_cash.map((cash, i) =>
            totalOtherCashArray.push(cash.amount)
          );
          const totalOtherCashAmount = totalOtherCashArray.reduce(
            (a, b) => a + b,
            0
          );

          const sumOfSellingCosts =
            values.advertising_cost +
            values.selling_legal_fees +
            values.selling_gov_fees +
            values.selling_bank_fees +
            values.real_estate_fee;

          const valueOfCurrentHome =
            values.current_home_sale_price - values.current_home_loan_amount;

          const stampDueAmount =
            ((values.cost_new_home - 1013000) / 100) * 5.5 + 41017;

          const profitFromSale =
            valueOfCurrentHome - sumOfSellingCosts - totalOtherSellingCosts;

          const twentyDeposit = (values.cost_new_home / 100) * 20;
          const eightyDeposit = values.cost_new_home - twentyDeposit;
          const tenDeposit = twentyDeposit / 2;

          const sumOfBuyingCosts =
            values.buying_legal_fees +
            values.buying_gov_fees +
            values.buying_bank_fees +
            values.stamp_duty;

          const totalAmountRequiredToSettle = sumOfBuyingCosts + twentyDeposit;
          const totalAmountRemaining =
            profitFromSale - totalAmountRequiredToSettle + totalOtherCashAmount;

          return (
            <Form>
              <div className="flex flex-col border-2 mb-2 w-1/2 m-auto p-4 mt-12 rounded-lg">
                <p className="text-xl font-black">Your Current Home</p>
                <div className="flex flex-row justify-between items-center max-w-md font-light">
                  <label htmlFor="current_home_sale_price">
                    Sale Price Of Current Home
                  </label>
                  <input
                    type="number"
                    className="border rounded-lg m-2 p-2 font-light"
                    id="current_home_sale_price"
                    name="current_home_sale_price"
                    onChange={handleChange}
                    value={values.current_home_sale_price.toLocaleString()}
                  />
                </div>
                <div className="flex flex-row justify-between items-center max-w-md font-light">
                  <label htmlFor="current_home_loan_amount">
                    Current Home Loan Amount
                  </label>
                  <input
                    type="text"
                    className="border rounded-lg m-2 p-2 font-light"
                    id="current_home_loan_amount"
                    name="current_home_loan_amount"
                    onChange={handleChange}
                    value={values.current_home_loan_amount.toLocaleString()}
                  />
                </div>
              </div>
              <div className="flex flex-col border-2 mb-2 w-1/2 m-auto p-4 mt-8 rounded-lg">
                <p className="text-xl font-black">Your Real Estate Agent</p>
                <div className="flex flex-row justify-between items-center max-w-md font-light">
                  <label htmlFor="real_estate_percentage">
                    Real Estate Agent % Fee
                  </label>
                  <input
                    type="number"
                    className="border rounded-lg m-2 p-2 font-light"
                    id="real_estate_percentage"
                    name="real_estate_percentage"
                    onChange={handleChange}
                    onBlur={() =>
                      setFieldValue(
                        "real_estate_fee",
                        (values.current_home_sale_price / 100) *
                          values.real_estate_percentage
                      )
                    }
                  />
                </div>
                <div className="flex flex-row justify-between items-center max-w-md font-light">
                  <label htmlFor="real_estate_fee">
                    Real Estate Commission Fee
                  </label>
                  <input
                    disabled={true}
                    type="text"
                    className="border rounded-lg m-2 p-2 font-light"
                    id="real_estate_fee"
                    name="real_estate_fee"
                    onChange={handleChange}
                    value={values.real_estate_fee.toLocaleString()}
                  />
                </div>
              </div>
              <div className="flex flex-col border-2 mb-2 w-1/2 m-auto p-4 mt-8 rounded-lg">
                <p className="text-xl font-black">Selling Costs</p>
                <div className="flex flex-row justify-between items-center max-w-md font-light">
                  <label htmlFor="advertising_cost">Advertising Costs</label>
                  <input
                    type="number"
                    className="border rounded-lg m-2 p-2 font-light"
                    id="advertising_cost"
                    name="advertising_cost"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-row justify-between items-center max-w-md font-light">
                  <label htmlFor="selling_legal_fees">Legal Fees</label>
                  <input
                    type="number"
                    className="border rounded-lg m-2 p-2 font-light"
                    id="selling_legal_fees"
                    name="selling_legal_fees"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-row justify-between items-center max-w-md font-light">
                  <label htmlFor="selling_gov_fees">Government Fees</label>
                  <input
                    type="number"
                    className="border rounded-lg m-2 p-2 font-light"
                    id="selling_selling_gov_fees"
                    name="selling_gov_fees"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-row justify-between items-center max-w-md font-light">
                  <label htmlFor="selling_bank_fees">Bank Fees</label>
                  <input
                    type="number"
                    className="border rounded-lg m-2 p-2 font-light"
                    id="selling_bank_fees"
                    name="selling_bank_fees"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex flex-col border-2 mb-2 w-1/2 m-auto p-4 mt-8 rounded-lg">
                <p className="text-xl font-black">Other Selling Costs</p>
                <FieldArray name="selling_costs">
                  {({ insert, remove, push }) => (
                    <div className="">
                      {values.selling_costs.length > 0 &&
                        values.selling_costs.map((friend, index) => (
                          <div
                            key={index}
                            className="my-4 flex flex-row items-center"
                          >
                            <div className="flex flex-row justify-between items-center max-w-md font-light mr-8">
                              <label
                                className="mr-4"
                                htmlFor={`selling_costs.${index}.cost`}
                              >
                                Description
                              </label>
                              <Field
                                className="border rounded-lg m-2 p-2 font-light"
                                name={`selling_costs.${index}.cost`}
                                placeholder="e.g Movers"
                                type="Text"
                              />
                              <ErrorMessage
                                name={`selling_costs.${index}.cost`}
                                component="div"
                                className="field-error"
                              />
                            </div>
                            <div className="flex flex-row justify-between items-center max-w-md font-light">
                              <label
                                className="mr-4"
                                htmlFor={`selling_costs.${index}.amount`}
                              >
                                Amount
                              </label>
                              <Field
                                className="focus:outline-none border rounded-lg m-2 p-2 font-light"
                                name={`selling_costs.${index}.amount`}
                                placeholder="$"
                                type="number"
                                onBlur={() =>
                                  setFieldValue(
                                    "total_other_costs",
                                    totalOtherSellingCosts
                                  )
                                }
                              />
                              <ErrorMessage
                                name={`selling_costs.${index}.name`}
                                component="div"
                                className="field-error"
                              />
                            </div>
                            <div className="col">
                              <button
                                type="button"
                                className="focus:outline-none border rounded-full px-2 font-medium ml-8 bg-red-500 hover:bg-red-300 text-white"
                                onClick={() => remove(index)}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        ))}
                      {values.selling_costs.length === 0 && (
                        <>
                          <p className="font-bold pt-8 text-center">
                            You Do Not Have Any Extra Cost
                          </p>
                          <p className="font-bold pb-8 text-center">
                            Use the button below to add some if required
                          </p>
                        </>
                      )}
                      <button
                        className="hover:bg-green-500 hover:shadow-lg border rounded-lg p-2 font-light"
                        type="button"
                        onClick={() => push({ cost: "", amount: 0 })}
                      >
                        Add Cost
                      </button>
                      <div className="flex flex-row justify-between items-center max-w-md font-light mt-8">
                        <label htmlFor="total_other_costs">
                          Total Other Costs
                        </label>
                        <input
                          disabled={true}
                          type="text"
                          className="border rounded-lg m-2 p-2 font-light"
                          id="total_other_costs"
                          name="total_other_costs"
                          onChange={handleChange}
                          value={totalOtherSellingCosts.toLocaleString()}
                        />
                      </div>
                    </div>
                  )}
                </FieldArray>
              </div>
              <div className="flex flex-col border-2 mb-2 w-1/2 m-auto p-4 mt-8 rounded-lg">
                <p className="text-xl font-black">
                  Profit From Current Home Sale
                </p>

                <div className="flex flex-row justify-between items-center max-w-md font-light">
                  <label htmlFor="total_from_sale">Total From Sale</label>
                  <input
                    disabled={true}
                    type="text"
                    className="border rounded-lg m-2 p-2 font-light"
                    id="total_from_sale"
                    name="total_from_sale"
                    onChange={handleChange}
                    value={profitFromSale.toLocaleString()}
                  />
                </div>
              </div>
              <div className="flex flex-col border-2 mb-2 w-1/2 m-auto p-4 mt-8 rounded-lg">
                <p className="text-xl font-black">Your New Home</p>

                <div className="flex flex-row justify-between items-center max-w-md font-light">
                  <label htmlFor="cost_new_home">Cost Of Your New Home</label>
                  <input
                    type="text"
                    className="border rounded-lg m-2 p-2 font-light"
                    id="cost_new_home"
                    name="cost_new_home"
                    onChange={handleChange}
                    onBlur={() => {
                      setFieldValue("stamp_duty", stampDueAmount);
                      setFieldValue("twenty_loan_amount", twentyDeposit);
                      setFieldValue("eighty_loan_amount", eightyDeposit);
                      setFieldValue("ten_cheque_amount", tenDeposit);
                    }}
                    value={values.cost_new_home.toLocaleString()}
                  />
                </div>
              </div>

              <div className="flex flex-col border-2 mb-2 w-1/2 m-auto p-4 mt-8 rounded-lg">
                <p className="text-xl font-black">Buying Costs</p>
                <div className="flex flex-row justify-between items-center max-w-md font-light">
                  <label htmlFor="stamp_duty">Stamp Duty</label>
                  <input
                    disabled={true}
                    type="text"
                    className="border rounded-lg m-2 p-2 font-light"
                    id="stamp_duty"
                    name="stamp_duty"
                    onChange={handleChange}
                    value={values.stamp_duty.toLocaleString()}
                  />
                </div>
                <div className="flex flex-row justify-between items-center max-w-md font-light">
                  <label htmlFor="buying_legal_fees">Legal Fees</label>
                  <input
                    type="number"
                    className="border rounded-lg m-2 p-2 font-light"
                    id="buying_legal_fees"
                    name="buying_legal_fees"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-row justify-between items-center max-w-md font-light">
                  <label htmlFor="buying_gov_fees">Government Fees</label>
                  <input
                    type="number"
                    className="border rounded-lg m-2 p-2 font-light"
                    id="buying_gov_fees"
                    name="buying_gov_fees"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-row justify-between items-center max-w-md font-light">
                  <label htmlFor="buying_bank_fees">Bank Fees</label>
                  <input
                    type="number"
                    className="border rounded-lg m-2 p-2 font-light"
                    id="buying_bank_fees"
                    name="buying_bank_fees"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex flex-col border-2 mb-2 w-1/2 m-auto p-4 mt-8 rounded-lg">
                <p className="text-xl font-black">Home Loan Details</p>
                <div className="flex flex-row justify-between items-center max-w-md font-light">
                  <label htmlFor="eighty_loan_amount">80% Loan Amount</label>
                  <input
                    disabled={true}
                    type="text"
                    className="border rounded-lg m-2 p-2 font-light"
                    id="eighty_loan_amount"
                    name="eighty_loan_amount"
                    onChange={handleChange}
                    value={values.eighty_loan_amount.toLocaleString()}
                  />
                </div>
                <div className="flex flex-row justify-between items-center max-w-md font-light">
                  <label htmlFor="twenty_loan_amount">20% Deposit</label>
                  <input
                    disabled={true}
                    type="text"
                    className="border rounded-lg m-2 p-2 font-light"
                    id="twenty_loan_amount"
                    name="twenty_loan_amount"
                    onChange={handleChange}
                    value={values.twenty_loan_amount.toLocaleString()}
                  />
                </div>
              </div>
              <div className="flex flex-col border-2 mb-2 w-1/2 m-auto p-4 mt-8 rounded-lg">
                <p className="text-xl font-black">On The Day Cheque</p>
                <div className="flex flex-row justify-between items-center max-w-md font-light">
                  <label htmlFor="ten_cheque_amount">
                    10% Deposit On The Day Amount
                  </label>
                  <input
                    disabled={true}
                    type="text"
                    className="border rounded-lg m-2 p-2 font-light"
                    id="ten_cheque_amount"
                    name="ten_cheque_amount"
                    onChange={handleChange}
                    value={values.ten_cheque_amount.toLocaleString()}
                  />
                </div>
              </div>
              <div className="flex flex-col border-2 mb-2 w-1/2 m-auto p-4 mt-8 rounded-lg">
                <p className="text-xl font-black">
                  Funds Required For Settlement
                </p>
                <div className="flex flex-row justify-between items-center max-w-md font-light">
                  <label htmlFor="total_settlement_amount">
                    Total Amount Required To Settle
                  </label>
                  <input
                    disabled={true}
                    type="text"
                    className="border rounded-lg m-2 p-2 font-light"
                    id="total_settlement_amount"
                    name="total_settlement_amount"
                    onChange={handleChange}
                    value={totalAmountRequiredToSettle.toLocaleString()}
                  />
                </div>
              </div>
              <div className="flex flex-col border-2 mb-2 w-1/2 m-auto p-4 mt-8 rounded-lg">
                <p className="text-xl font-black">Additional Available Cash</p>
                <FieldArray name="additional_cash">
                  {({ insert, remove, push }) => (
                    <div className="">
                      {values.additional_cash.length > 0 &&
                        values.additional_cash.map((cash, index) => (
                          <div
                            key={index}
                            className="my-4 flex flex-row items-center"
                          >
                            <div className="flex flex-row justify-between items-center max-w-md font-light mr-8">
                              <label
                                className="mr-4"
                                htmlFor={`additional_cash.${index}.description`}
                              >
                                Description
                              </label>
                              <Field
                                className="border rounded-lg m-2 p-2 font-light"
                                name={`additional_cash.${index}.description`}
                                placeholder="e.g Savings"
                                type="Text"
                              />
                              <ErrorMessage
                                name={`additional_cash.${index}.description`}
                                component="div"
                                className="field-error"
                              />
                            </div>
                            <div className="flex flex-row justify-between items-center max-w-md font-light">
                              <label
                                className="mr-4"
                                htmlFor={`additional_cash.${index}.amount`}
                              >
                                Amount
                              </label>
                              <Field
                                className="focus:outline-none border rounded-lg m-2 p-2 font-light"
                                name={`additional_cash.${index}.amount`}
                                placeholder="$"
                                type="number"
                                onBlur={() =>
                                  setFieldValue(
                                    "total_other_cash",
                                    totalOtherCashAmount
                                  )
                                }
                              />
                              <ErrorMessage
                                name={`additional_cash.${index}.name`}
                                component="div"
                                className="field-error"
                              />
                            </div>
                            <div className="col">
                              <button
                                type="button"
                                className="focus:outline-none border rounded-full px-2 font-medium ml-8 bg-red-500 hover:bg-red-300 text-white"
                                onClick={() => remove(index)}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        ))}
                      {values.additional_cash.length === 0 && (
                        <>
                          <p className="font-bold pt-8 text-center">
                            You Do Not Have Any Extra Cash Listed
                          </p>
                          <p className="font-bold pb-8 text-center">
                            Use the button below to add some if required
                          </p>
                        </>
                      )}
                      <button
                        className="hover:bg-green-500 hover:shadow-lg border rounded-lg p-2 font-light"
                        type="button"
                        onClick={() => push({ description: "", amount: 0 })}
                      >
                        Add Cost
                      </button>
                      <div className="flex flex-row justify-between items-center max-w-md font-light mt-8">
                        <label htmlFor="total_other_costs">
                          Total Other Cash
                        </label>
                        <input
                          disabled={true}
                          type="text"
                          className="border rounded-lg m-2 p-2 font-light"
                          id="total_other_costs"
                          name="total_other_costs"
                          onChange={handleChange}
                          value={values.total_other_cash.toLocaleString()}
                        />
                      </div>
                    </div>
                  )}
                </FieldArray>
              </div>
              <div className="flex flex-col border-2 mb-2 w-1/2 m-auto p-4 mt-8 rounded-lg">
                <p className="text-xl font-black">
                  Total Remaining In Your Bank After Settlement
                </p>
                <div className="flex flex-row justify-between items-center max-w-md font-light">
                  <label htmlFor="total_remaining_cash">
                    Total Remaining Cash
                  </label>
                  <input
                    disabled={true}
                    type="text"
                    className="border rounded-lg m-2 p-2 font-light"
                    id="total_remaining_cash"
                    name="total_remaining_cash"
                    onChange={handleChange}
                    value={totalAmountRemaining.toLocaleString()}
                  />
                </div>
              </div>
              {/* <div className="flex flex-col border-2 mb-2 w-1/2 m-auto p-4 rounded-lg">
                <button className="font-black" type="submit">
                  Submit
                </button>
              </div> */}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Basic;
