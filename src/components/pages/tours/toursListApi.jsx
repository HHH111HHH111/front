import { useEffect, useState } from "react"
import axios from 'axios'
import TourItem from "./touritem";
import styled from "styled-components";
import Pagination from "react-js-pagination"
import TourHeader from "./tourHeader";
import AreaCode from "./areaCode1/areaCode";
import CategoryCode from "./categoryCode1/categoryCode";
import ContentsTypeId from "./contentsTypeId/contentsTypeId";
import DetailAreaCode from "./areaCode1/detailAreaCode";
import CallAPI from "components/ui/callAPI";
import SearchBar from "../searchKeyword/searchBar";
 



const TourListBlock = styled.div`
    box-sizing: border-box;
    padding-bottom: 3rem;
    width: 768px;
    margin: 0 auto;
    margin-top: 2rem;
    @media screen and (max-width: 768px){
        width: 100%;
        padding-left: 1rem;
        padding-right: 1rem;
    }
`;

const PaginationBox = styled.div`
    .pagination { 
        display: flex; 
        // justify-content: center; 
        margin-top: 15px;
    }
    ul { list-style: none; padding: 0; }
    ul.pagination li {
        display: inline-block;
        width: 30px;
        height: 30px;
        border: 1px solid #e2e2e2;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1rem; 
    }
    ul.pagination li:first-child{ border-radius: 5px 0 0 5px; }
    ul.pagination li:last-child{ border-radius: 0 5px 5px 0; }
    ul.pagination li a { text-decoration: none; color: #337ab7; font-size: 1rem; }
    ul.pagination li.active a { color: white; }
    ul.pagination li.active { background-color: #337ab7; }
    ul.pagination li a:hover,
    ul.pagination li a.active { color: blue; }
`


const ToursListApi = ({keyword}) => {
    const [loading, setLoading] = useState(false);

    const [datas, setData] = useState(null);
    const [page, setPage] = useState(1);
    const [totalData, setTotalData] = useState(1);
    const itemsCountPerPage = 10;

    const [areaCode , setAreaCode] = useState("") ;
    const [categoryCode, setCategoryCode] = useState("");
    const [contentsTypeId, setContentsTypeId] = useState("");
    // 시군구 코드
    const [ showDetailAreaCode, setShowDetailAreaCode ] = useState("");
    const [ detailAreaCode, setDetailAreaCode ] = useState("");

    const [filter , setFilter] = useState("")
    const [ areaName , setAreaName] = useState("");

    const [saveKeyWord, setSaveKeyWord] = useState(keyword);

    // 태그 클릭시 요청값 저장
    const key = 'wGgAMNctzAVjo7O4ZlwZPcCNHPr9t8IPlm4lYhfG1RbY79FR2pL%2BnAhWAyP0%2FObPwgvONXIi1Ke1UTRujCO%2Fnw%3D%3D'
    console.log(keyword)

    useEffect(() => {
        setSaveKeyWord(keyword)
        setFilter(keyword)
    }, [keyword])



    // api 호출 
    useEffect(() => {
        console.log("값을 보자 ",saveKeyWord)
        if(saveKeyWord && saveKeyWord !== ""){
            console.log("if문실행")
            const link = "searchKeyword1";
            const param = `MobileOS=ETC&MobileApp=AppTest&_type=json&keyword=${saveKeyWord}&numOfRows=${itemsCountPerPage}&pageNo=${page}`

            const fetchSearchData = async() => {
                const response = await CallAPI(link, param ,setLoading)
                setData(response.data.response.body.items.item);
                setTotalData(response.data.response.body.totalCount)
                console.log(response)
    
            }
    
            fetchSearchData();
            
        } else {
            console.log("else문실행")
            const fetchData = async () => {
                setLoading(true);
                try {
                    const response = await axios.get(
                        // 	지역기반관광정보조회 - areaBasedList1
                        `http://apis.data.go.kr/B551011/KorService1/areaBasedList1?numOfRows=${itemsCountPerPage}&pageNo=${page}&MobileOS=ETC&MobileApp=AppTest&_type=json&ServiceKey=${key}&listYN=Y&arrange=Q&contentTypeId=${contentsTypeId}&areaCode=${areaCode}&sigunguCode=${detailAreaCode}&cat1=${categoryCode}&cat2=&cat3=`
                        );
                    setData(response.data.response.body.items.item);
                    setTotalData(response.data.response.body.totalCount);
                    setLoading(false);
        
                } catch (error) {
                    console.log(error);
                    setLoading(false);
                }
            }
            fetchData();
        }
    
    },[page, areaCode, categoryCode, contentsTypeId, detailAreaCode, showDetailAreaCode, saveKeyWord ,keyword])

    console.log("data1 : " , datas)

    useEffect(() => {
        console.log("areaName: ", areaName);
    }, [areaName]);

    
    const handlePageChange = ( page ) =>{ setPage(page)}


    
    const handleFilterArea = (data) => {
        setSaveKeyWord("");

        setDetailAreaCode("");
        setAreaCode(data.code);
        setAreaName(data.name);

        setFilter(data.name)
        console.log("체크: ",data)

        const renderDetailAreaCode = (areaCode, areaName) => {
            if (areaCode !== '') {
                return (
                    <DetailAreaCode
                        code={areaCode}
                        area={areaName}
                        onClick={handleFilterDetailArea}
                    />
                );
            } else {
                return null;
            }
        }

        setShowDetailAreaCode(renderDetailAreaCode(data.code, data.name));
    }

    
    const handleFilterDetailArea = (data) => {
        setSaveKeyWord("");
        setDetailAreaCode(data.code)
        const fn = `${data.area} ${data.name}`
        console.log("fn : " ,fn)
        setFilter(fn)
    }

    const handleFilterCategory = (data) => {
        setSaveKeyWord("");
        setCategoryCode(data.code)
        setFilter(data.name)
    }

    const handleFilterContentsTypeId = (data) => {
        setSaveKeyWord("");
        setContentsTypeId(data.code)
        setFilter(data.name)
    }

    const handleSearch = (term) => {
        setSaveKeyWord(term);
        setFilter(term)
    };



    // 대기 중일때
    if(loading){
        return <>대기중 ... </>;
    }

    // 아직 datas 값이 설정되지 않았을 때
    if(!datas){
        return <div>값이 없습니다.</div>;
    }

    return (
        <>  
            <TourListBlock>
                <div>
                    값 확인
                    <h4>areaCode : {areaCode} , categoryCode : {categoryCode} , 
                    contentsTypeId : {contentsTypeId} , detailAreaCode : {detailAreaCode}</h4>
                </div>
                {/* 카테고리 - 버튼을 누르면 버튼의 값으로 api 요청 */}
                <AreaCode onClick={handleFilterArea}/>
                {showDetailAreaCode}
                <CategoryCode onClick={handleFilterCategory}/>
                <ContentsTypeId onClick={handleFilterContentsTypeId} />

                {/* 검색 */}
                <SearchBar onSearch={handleSearch}/>

                {/* 리스트 내용  */}
                <TourHeader totalCount={totalData} a={filter} />
                    {datas.map((data, index) => (
                            <TourItem key={data.firstimage || index } data={data} />
                    ))}

                {/* 페이징 */}
                <PaginationBox>
                    <Pagination
                        // 현재 페이지
                        activePage={page}
                        // 페이지당 아이템 수
                        itemsCountPerPage={itemsCountPerPage}
                        // 
                        totalItemsCount={totalData}
                        // 표시할 페이지 수
                        pageRangeDisplayed={5}
                        // 함수
                        onChange={handlePageChange}>
                    </Pagination>
                </PaginationBox>
            </TourListBlock>
        </>
    )

}



export default ToursListApi;
