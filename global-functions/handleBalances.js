import React from 'react';

const handleBalances = (Variables, setGlobalVariableValue) => {
  try {
    //No credit for now
    setGlobalVariableValue({ key: 'CREDIT_BALANCE', value: '0.00' });
    setGlobalVariableValue({ key: 'INVESTMENT_BALANCE', value: '0.00' });

    //Filter out US vs Investment balances
    usdHoldings = Variables.USER_BALANCES.filter(holding =>
      holding.asset.toLowerCase().includes('usd')
    );
    investmentBalances = Variables.USER_BALANCES.filter(
      holding => !holding.asset.toLowerCase().includes('usd')
    );

    //TODO: CALCULATE VALUE OF INVESTMENTS HERE

    usSum = usdHoldings.reduce(
      (partialSum, usdHolding) => partialSum + parseFloat(usdHolding.balance),
      0
    );
    setGlobalVariableValue({
      key: 'CASH_BALANCE',
      value: String(usSum.toFixed(2)),
    });
    setGlobalVariableValue({
      key: 'BUYING_POWER',
      value: usSum - Variables.CREDIT_BALANCE,
    });

    return;
  } catch (error) {}
};

export default handleBalances;
