export default {
  category: "Tracer Analytics",
  name: "TCR Distributions",
  description: `Tracer is a trustless protocol for creating and trading financial derivatives. Using TCR, Tracer's governance token, users can vote and control the smart contracts powering Tracer. 

In this dashboard, we'll explore the distribution of Tracer's governance token to users as rewards. Users can participate Tracer's Perpetual Pools, stake the Pool tokens and earn TCR rewards.`,
  mainVisual: {
    type: "ScatterChart",
    endpoint:
      "https://api.flipsidecrypto.com/api/v2/queries/0cc2e53a-8e99-4855-88f2-94aefb41592d/data/latest",
    dataMapping: {
      date: "DATE",
      value: "AMOUNT",
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
    },
  },
  sections: [
    {
      heading: "Key questions",
      content: [
        {
          body: "How much of the initial TCR (allocated to the DAO) has been distributed to users?",
        },
        {
          body: "How much TCR is distributed per day to users?",
        },
      ],
    },
    {
      heading: "TCR holdings",
      description:
        "The TCR token has a maximum supply of 1,000,000,000. It was initially distributed on the 8th September, 2021. Tracer DAO was allocated 64.04% of the supply.",
      visual: {
        type: "StackedAreaChart",
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
    {
      heading: "TCR distributions per day",
      description: "Tracer DAO holds TCR token in various addresses.",
      visual: {
        type: "AreaChart",
        endpoint:
          "https://api.flipsidecrypto.com/api/v2/queries/092c26de-8a4f-403b-b877-9ac56f32fcc0/data/latest",
        dataMapping: {
          date: "DATE",
          value: "AMOUNT",
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
          height: "60vh",
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
            WITH reward_withdraws as (
              SELECT tx_id from ethereum.udm_events
              WHERE EVENT_NAME = '0x365fb1c64489007fb28325f54a1decf6c676c016af7d4b46371e1fe2f073a757'
              AND CONTRACT_ADDRESS = '0xa84918f3280d488eb3369cb713ec53ce386b6cba'
            )

            SELECT SUM(AMOUNT) as AMOUNT, date_trunc('day', BLOCK_TIMESTAMP) as DATE, 'UserWithdraw' as LABEL FROM reward_withdraws r
            LEFT JOIN ethereum.udm_events u
            ON r.TX_ID = u.TX_ID
            WHERE FROM_ADDRESS = '0xa84918f3280d488eb3369cb713ec53ce386b6cba'
            AND CONTRACT_ADDRESS = '0x9c4a4204b79dd291d6b6571c5be8bbcd0622f050'
            AND EVENT_TYPE = 'erc20_transfer'
            GROUP BY DATE, LABEL
            ORDER BY DATE ASC`,
        },
      },
    },
    {
      heading: "Proportion of DAO funds distributed as rewards",
      description: "Tracer DAO holds TCR token in various addresses.",
      visual: {
        type: "GaugeChart",
        endpoint:
          "https://api.flipsidecrypto.com/api/v2/queries/e783479e-f17e-4c26-9dc7-d5bae5609bb9/data/latest",
        dataMapping: {
          value: "AMOUNT",
          group: "LABEL",
        },
        options: {
          resizable: true,
          height: "250px",
          gauge: {
            type: "full",
            alignment: "center",
          },

          sql: `
WITH reward_withdraws as (
  SELECT tx_id from ethereum.udm_events
  WHERE EVENT_NAME = '0x365fb1c64489007fb28325f54a1decf6c676c016af7d4b46371e1fe2f073a757'
  AND CONTRACT_ADDRESS = '0xa84918f3280d488eb3369cb713ec53ce386b6cba'
)

SELECT SUM(AMOUNT)*100/640400000 as AMOUNT, 'value' as LABEL FROM reward_withdraws r
LEFT JOIN ethereum.udm_events u
ON r.TX_ID = u.TX_ID
WHERE FROM_ADDRESS = '0xa84918f3280d488eb3369cb713ec53ce386b6cba'
AND CONTRACT_ADDRESS = '0x9c4a4204b79dd291d6b6571c5be8bbcd0622f050'
AND EVENT_TYPE = 'erc20_transfer'`,
        },
      },
    },
    {
      heading: "Methodology",
      content: [
        {
          heading: "Filtering for reward distributions",
          body: "To find user TCR reward withdrawals (distributions), the specific event name (0x365fb1c64489007fb28325f54a1decf6c676c016af7d4b46371e1fe2f073a757) was used as a filter on ethereum.events_emitted",
        },
        {
          heading: "Finding reward amounts",
          body: "The TX_ID of distribution transactions were used to join ethereum.udm_events to find the associated erc_20 transfer of TCR tokens and the transfer amount",
        },
      ],
    },
    {
      heading: "About",
      content: [
        {
          heading: "Data from Flipside Crypto",
          body: "flipsidecrypto.xyz",
          href: "https://flipsidecrypto.xyz/",
        },
        {
          heading: "Charts from Carbon Charts",
          body: "github.com/carbon-design-system/carbon-charts",
          href: "https://github.com/carbon-design-system/carbon-charts/",
        },
        {
          heading: "Components from Carbon Components",
          body: "carbondesignsystem.com/components/overview",
          href: "https://www.carbondesignsystem.com/components/overview/",
        },
        {
          heading: "Built by github.com/karlxlee",
          body: "github.com/karlxlee",
          href: "https://github.com/karlxlee/",
        },
      ],
    },
  ],
};
