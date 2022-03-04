import Head from "next/head";
import {
  Header,
  HeaderName,
  Grid,
  Row,
  Column,
  Tile,
  ClickableTile,
} from "carbon-components-react";
import visualizer from "../visualizer.yaml";
import SwrChart from "@/components/SwrChart";

export default function Home({ info, sections }) {
  console.log(sections);
  return (
    <>
      <Head>
        <title>{info.title + " - " + info.category}</title>
      </Head>
      <Header aria-label={info.category}>
        <HeaderName href="#" prefix={info.category}>
          {info.title}
        </HeaderName>
      </Header>
      <div>
        {sections.map((section) => {
          if (section.type == "hero") {
            return (
              <Grid fullWidth>
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
                    <h1 style={{ fontWeight: "bold" }}>{info.title}</h1>
                    <p
                      style={{
                        marginTop: "1em",
                        whiteSpace: "pre-line",
                        wordBreak: "break-word",
                      }}
                    >
                      {section.description}
                    </p>
                  </Column>
                  <Column
                    sm={12}
                    md={12}
                    lg={{ span: 8 }}
                    style={{ height: "80vh" }}
                  >
                    {section.visual && <SwrChart {...section.visual} />}
                  </Column>
                </Row>
              </Grid>
            );
          } else {
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
                      <p
                        style={{
                          marginTop: "1em",
                          whiteSpace: "pre-line",
                          wordBreak: "break-word",
                        }}
                      >
                        {section.description}
                      </p>
                    </Column>
                    <Column sm={12} md={12} lg={8}>
                      {section.visual && <SwrChart {...section.visual} />}
                      {section.content &&
                        section.content.map((entry) =>
                          entry.href ? (
                            <ClickableTile
                              key={entry.href}
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
                              key={entry.heading}
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
          }
        })}
      </div>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: { ...visualizer },
  };
}
