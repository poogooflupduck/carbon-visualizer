import { Header, HeaderName, Grid, Row, Column } from "carbon-components-react";
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
      <div style={{ marginTop: "4em" }}>
        <Grid fullWidth style={{ backgroundColor: "" }}>
          <Row>
            <Column sm={12} md={12} lg={4}>
              <h1>{visualizer.name}</h1>
              <p>{visualizer.description}</p>
            </Column>
          </Row>
          {visualizer.sections.map((section) => {
            return (
              <Row key={section.heading}>
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
