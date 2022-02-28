import {
  Header,
  HeaderName,
  Grid,
  Row,
  Column,
  UnorderedList,
  ListItem,
  Tile,
  ClickableTile,
} from "carbon-components-react";
import visualizer from "@/visualizer";
import SwrChart from "@/components/SwrChart";

export default function Home({ visualizer }) {
  return (
    <>
      <Header aria-label={visualizer.category}>
        <HeaderName href="#" prefix={visualizer.category}>
          {visualizer.name}
        </HeaderName>
      </Header>
      <div>
        <Grid fullWidth style={{}}>
          <Row
            style={{
              paddingTop: "6em",
              paddingBottom: "4em",
            }}
          >
            <Column sm={12} md={12} lg={4}>
              <Column
                sm={0}
                md={12}
                lg={12}
                style={{ paddingTop: "4em" }}
              ></Column>
              <h1 style={{ fontWeight: "bold" }}>{visualizer.name}</h1>
              <p style={{ marginTop: "1em", whiteSpace: "pre-wrap" }}>
                {visualizer.description}
              </p>
            </Column>
            <Column sm={12} md={12} lg={{ span: 8 }} style={{ height: "80vh" }}>
              {visualizer.mainVisual && <SwrChart {...visualizer.mainVisual} />}
            </Column>
          </Row>
        </Grid>
        {visualizer.sections.map((section) => {
          return (
            <div
              key={section.heading}
              style={{
                borderTop: "1px solid #393939",
                paddingTop: "4em",
                paddingBottom: "4em",
              }}
            >
              <Grid fullWidth>
                <Row>
                  <Column sm={12} md={12} lg={4}>
                    <h2>{section.heading}</h2>
                    <p style={{ marginTop: "1em" }}>{section.description}</p>
                  </Column>
                  <Column sm={12} md={12} lg={8}>
                    {section.visual && <SwrChart {...section.visual} />}
                    {section.content &&
                      section.content.map((entry) =>
                        entry.href ? (
                          <ClickableTile
                            href={entry.href}
                            target="_blank"
                            style={{
                              marginTop: "1em",
                              fontSize: "16px",
                              lineHeight: "1.5",
                              wordBreak: "break-word",
                            }}
                          >
                            {entry.heading && (
                              <>
                                <span style={{ fontWeight: "bold" }}>
                                  {entry.heading}
                                </span>
                                <br />
                              </>
                            )}
                            {entry.body}
                          </ClickableTile>
                        ) : (
                          <Tile
                            style={{
                              marginTop: "1em",
                              fontSize: "16px",
                              lineHeight: "1.5",
                              wordBreak: "break-word",
                            }}
                          >
                            {entry.heading && (
                              <>
                                <span style={{ fontWeight: "bold" }}>
                                  {entry.heading}
                                </span>
                                <br />
                              </>
                            )}
                            {entry.body}
                          </Tile>
                        )
                      )}
                  </Column>
                </Row>
              </Grid>
            </div>
          );
        })}
      </div>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: { visualizer },
  };
}
