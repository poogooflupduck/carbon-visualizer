import {
  Header,
  HeaderName,
  Grid,
  Row,
  Column,
  UnorderedList,
  ListItem,
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
        <Grid fullWidth style={{ backgroundColor: "" }}>
          <Row
            style={{ paddingTop: "6em", paddingBottom: "4em", height: "100vh" }}
          >
            <Column sm={12} md={12} lg={{ span: 4 }}>
              <h1>{visualizer.name}</h1>
              <p style={{ marginTop: "1em" }}>{visualizer.description}</p>
              <UnorderedList>
                {visualizer.highlights.map((highlight) => (
                  <ListItem key={highlight}>{highlight}</ListItem>
                ))}
              </UnorderedList>
            </Column>
            <Column sm={12} md={12} lg={{ span: 4, offset: 4 }}>
              {visualizer.mainVisual && <SwrChart {...visualizer.mainVisual} />}
            </Column>
          </Row>
          {visualizer.sections.map((section) => {
            return (
              <Row
                key={section.heading}
                style={{ borderTop: "1px solid white", paddingTop: "2em" }}
              >
                <Column sm={12} md={12} lg={4}>
                  <h2>{section.heading}</h2>
                  <p>{section.description}</p>
                </Column>
                <Column sm={12} md={12} lg={8}>
                  <SwrChart {...section.visual} />
                </Column>
              </Row>
            );
          })}
        </Grid>
      </div>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: { visualizer },
  };
}
