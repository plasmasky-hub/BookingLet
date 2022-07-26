import Layout from "../../../../components/shared/Layout"

const FilterWrapper = styled.div`
    width:1173px;
    height:143px;
    margin: 0 auto;
`

const StoreFilter = () =>(
    <Layout>
    <FilterWrapper>
        <h2></h2>
        <QuantityDate></QuantityDate>
        <LocationBar></LocationBar>
        <SortBar></SortBar>
    </FilterWrapper>
    </Layout>
)

export default StoreFilter;