import { Layout } from "@/src/components/Layout";
import type { PageParams } from "@/src/types/next"

export default async function RouteParams(props: PageParams<{}>) {
    return (
        <Layout>
            <p>hello world</p>
        </Layout>
    );
}