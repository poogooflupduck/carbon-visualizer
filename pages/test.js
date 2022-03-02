import visualizer from "../visualizer.yaml";

export default function Home({ visualizer }) {
  console.log(visualizer);
  return <></>;
}

export async function getStaticProps() {
  return {
    props: {
      visualizer,
    },
  };
}
