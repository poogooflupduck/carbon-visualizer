import { useState } from "react";
import SwrData from "@/components/SwrData";
import dynamic from "next/dynamic";
import AreaSkeletonChart from "@/components/AreaSkeletonChart";

import { Modal, CodeSnippet } from "carbon-components-react";

const SwrChart = (props) => {
  const { data, isLoading, isError } = SwrData(props.endpoint);
  const DynamicComponent = dynamic(() =>
    import("@carbon/charts-react").then((mod) => mod[props.type])
  );

  const [sqlOpen, setSqlOpen] = useState(false);

  if (isLoading) return <AreaSkeletonChart height={props.options.height} />;
  if (isError) return <AreaSkeletonChart height={props.options.height} />;
  return (
    <>
      {props.sql && (
        <Modal
          open={sqlOpen}
          setOpen={setSqlOpen}
          passiveModal
          modalHeading="SQL query"
          modalLabel="Account resources"
          onRequestClose={() => setSqlOpen(false)}
        >
          <CodeSnippet type="multi" feedback="Copied to clipboard">
            {props.sql.replace(/ +(?= )/g, "")}
          </CodeSnippet>
        </Modal>
      )}
      <DynamicComponent
        data={
          props.mapping
            ? data.map((entry) => {
                Object.keys(props.mapping).map(
                  (key) => (entry[key] = entry[props.mapping[key]])
                );
                return {
                  ...entry,
                };
              })
            : data
        }
        options={{
          ...props.options,

          toolbar: props.options.toolbar
            ? {
                ...props.options.toolbar,
                controls: [
                  ...(props.options.toolbar.controls &&
                  props.options.toolbar.controls.length
                    ? props.options.controls
                    : [
                        { type: "Export as CSV" },
                        { type: "Export as PNG" },
                        { type: "Export as JPG" },
                        { type: "Make fullscreen" },
                        { type: "Reset zoom" },
                        { type: "Zoom out" },
                        { type: "Zoom in" },
                      ]),
                  ...(props.sql !== null
                    ? [
                        {
                          type: "Custom",
                          clickFunction: () => {
                            setSqlOpen(true);
                          },
                          iconSVG: {
                            content:
                              '<path d="M24 21V9h-2v14h8v-2h-6zM18 9h-4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h1v2a2 2 0 0 0 2 2h2v-2h-2v-2h1a2 2 0 0 0 2-2V11a2 2 0 0 0-2-2Zm-4 12V11h4v10ZM8 23H2v-2h6v-4H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h6v2H4v4h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2Z"/><path data-name="&lt;Transparent Rectangle&gt;" style="fill:none" d="M0 0h32v32H0z"/>',
                          },
                        },
                      ]
                    : []),
                  ...(props.endpoint !== null
                    ? [
                        {
                          type: "Custom",
                          clickFunction: () => {
                            window.open(props.endpoint, "_blank").focus();
                          },

                          iconSVG: {
                            content:
                              '<path d="M8 9H4a2 2 0 0 0-2 2v12h2v-5h4v5h2V11a2 2 0 0 0-2-2Zm-4 7v-5h4v5ZM22 11h3v10h-3v2h8v-2h-3V11h3V9h-8v2zM14 23h-2V9h6a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-4Zm0-7h4v-5h-4Z"/><path data-name="&lt;Transparent Rectangle&gt;" style="fill:none" d="M0 0h32v32H0z"/>',
                          },
                        },
                      ]
                    : []),
                ],
              }
            : {},
        }}
      />
    </>
  );
};

export default SwrChart;
