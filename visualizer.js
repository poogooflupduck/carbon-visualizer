export default {
  category: "Tracer",
  name: "TCR Distributions",
  description:
    "Tracer is a trustless protocol for financial derivatives. Tracer DAO owns and governs the smart contracts powering Tracer. Governors need to stake TCR (Tracer Token) in order to vote.",
  sections: [
    {
      heading: "TCR holdings",
      description: "Tracer DAO holds TCR token in various addresses.",
      visual: {
        type: "AreaChart",
        endpoint:
          "https://api.flipsidecrypto.com/api/v2/queries/16043f71-1f48-4d00-93b8-921d7c8d62aa/data/latest",
        dataMapping: {
          date: "DATE",
          value: "BALANCE",
          group: "LABEL",
        },
        options: {
          axes: {
            bottom: {
              title: "2019 Annual Sales Figures",
              mapsTo: "date",
              scaleType: "time",
            },
            left: {
              mapsTo: "value",
              scaleType: "linear",
            },
          },
          zoomBar: {
            top: {
              enabled: true,
            },
          },
          height: "400px",
          // curve: "curveNatural",
          toolbar: {
            enabled: true,
            numberOfIcons: 6,
            controls: [
              {
                type: "Zoom in",
              },
              {
                type: "Zoom out",
              },
              {
                type: "Reset zoom",
              },
            ],
          },
          sql: `
                  SELECT USER_ADDRESS, 'DAO' AS LABEL, BALANCE, BALANCE_DATE as DATE
                  FROM ethereum.erc20_balances
                  WHERE user_address  = '0xa84918f3280d488eb3369cb713ec53ce386b6cba'
                  AND CONTRACT_ADDRESS = '0x9c4a4204b79dd291d6b6571c5be8bbcd0622f050'
                  AND DATE >= CURRENT_DATE - interval'6 months'
                  ORDER BY DATE DESC`,
        },
      },
    },
  ],
};
