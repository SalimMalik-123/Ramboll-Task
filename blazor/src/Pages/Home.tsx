import React, { useEffect, useState } from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef } from 'ag-grid-community';
import AgGrid, { ColumnDefs } from '../Component/AgGrid';
import FormInput from '../Component/FormInput';
import SearchIcon from '@mui/icons-material/Search';
import axios, {isCancel, AxiosError} from 'axios';
import { log } from 'console';
import Modal from '../Component/Modal';
import flame from '../assets/flames.png'
interface Rows {
id : string,
count : string,
docty : string,
owner : string,
lang : string,
pdfurl : string,
versiontyp  : string,
}
// const rows:Rows[]=
// [
//   {
//     id: "34098940",
//    count: "Algeria",
//    docty: "Report",
//    owner: "MNA External Affairs (ECRMN)",
//     lang: "English",
//     pdfurl: "http://documents.worldbank.org/curated/en/099607506202340553/pdf/IDU029af6e650ac6404e170bc79062eb3b0de925.pdf",
//     versiontyp: "Final"
//   },
//   {
//     id: "34106951",
//    count: "Turkiye",
//    docty: "Procurement Plan",
//    owner: "Infra ECA Energy 1 (IECE1)",
//     lang: "English",
//     pdfurl: "http://documents.worldbank.org/curated/en/099062923193082652/pdf/P17923500f33c70090a4190a5cbcaf70f1f.pdf",
//     versiontyp: "Final"
//   },
//   {
//     id: "34068329",
//    count: "Turkiye",
//    docty: "Project Appraisal Document",
//    owner: "Infra ECA Energy 1 (IECE1)",
//     lang: "English",
//     pdfurl: "http://documents.worldbank.org/curated/en/099052523124027399/pdf/P17923506c0159010ace6063ba1bc662b1.pdf",
//     versiontyp: "Buff cover"
//   },
//   {
//     id: "34054708",
//    count: "Turkiye",
//    docty: "Procurement Plan",
//    owner: "Infra ECA Energy 1 (IECE1)",
//     lang: "English",
//     pdfurl: "http://documents.worldbank.org/curated/en/099050323033087530/pdf/P1792350f0d5f500f0a3f1099890f654a95.pdf",
//     versiontyp: "Final"
//   },
//   {
//     id: "34054998",
//    count: "Turkiye",
//    docty: "Procurement Plan",
//    owner: "Infra ECA Energy 1 (IECE1)",
//     lang: "English",
//     pdfurl: "http://documents.worldbank.org/curated/en/099050323043017219/pdf/P17923509cc69c0b809b50008315d1746fc.pdf",
//     versiontyp: "Final"
//   },
//   {
//     id: "34036748",
//    count: "Sierra Leone",
//    docty: "Policy Research Working Paper",
//    owner: "Social Protection & Labor AFR 3 (HAWS3)",
//     lang: "English",
//     pdfurl: "http://documents.worldbank.org/curated/en/099303504062354823/pdf/IDU0b1022d2e0c0d8046170bc440ef4dca71b211.pdf",
//     versiontyp: "Final"
//   },
//   {
//     id: "34025453",
//    count: "Turkiye",
//    docty: "Project Information Document",
//    owner: "Infra ECA Energy 1 (IECE1)",
//     lang: "English",
//     pdfurl: "http://documents.worldbank.org/curated/en/099205503212322763/pdf/P17923503d2e6c0008dc50a537047f08f8.pdf",
//     versiontyp: "Final"
//   },
//   {
//     id: "34024327",
//    count: "Turkiye",
//    docty: "Environmental and Social Commitment Plan",
//    owner: "Infra ECA Energy 1 (IECE1)",
//     lang: "English",
//     pdfurl: "http://documents.worldbank.org/curated/en/099105003202310876/pdf/P1792350cf22c80809d2502ed7e11b5c05.pdf",
//     versiontyp: "Final"
//   },
//   {
//     id: "34024331",
//    count: "Turkiye",
//    docty: "Stakeholder Engagement Plan",
//    owner: "Infra ECA Energy 1 (IECE1)",
//     lang: "English",
//     pdfurl: "http://documents.worldbank.org/curated/en/099105003202335649/pdf/P1792350fd7d35040a516079a2b0c46d4f.pdf",
//     versiontyp: "Final"
//   },
//   {
//     id: "34024329",
//    count: "Turkiye",
//    docty: "Environmental and Social Review Summary",
//    owner: "Infra ECA Energy 1 (IECE1)",
//     lang: "English",
//     pdfurl: "http://documents.worldbank.org/curated/en/099105003202341893/pdf/P17923503e2c650d70bbbe089c5bd9f8efe.pdf",
//     versiontyp: "Final"
//   }
// ]

const columns: ColumnDefs<Rows>[] = [
  { field: 'id', 
  headerName: 'ID',
//   flex:1,
//   minWidth:95,
  },
  { field: 'count', 
  headerName: 'Country',
//    flex:1,
//    minWidth:95,
 },
 { field: 'docty', 
 headerName: 'Doc type',
 
  },
  { field: 'owner', headerName: 'Owner',
//   flex:1,
//   minWidth:95,
},
{ field: 'pdfurl', 
headerName: 'PDF URL',
// flex:1,
// minWidth:95,
 },
 {
  field : 'lang',
  headerName : 'Language'
 },
 { field: 'versiontyp', headerName: 'Version type',
//    flex:1,
//    minWidth:95,
 },
 ]

const Home =()=>
{
    const [rows,setRows] = useState<Rows[]>()
    const [issearch,setIsSearch] = useState<boolean>(false)
    const [search,setSearch] = useState<string>('')
    const [showModal,setShowModal] = useState<boolean>(false)
    const [msg,setMsg] = useState<string>('')

     

    useEffect(()=>{
        // axios.get<Rows[]>('https://localhost:7060/api/data/GetPublicData?searchTerm=wind')
        // .then((res)=>{
        //     console.log(res)
        //     setRows([...res.data.filter(data => data.id !== null)])
        // })
        // .catch(err => alert(err))
        debugger
        HandleSearch()
    },[issearch]) 

    const HandleSearch =()=>{
        setShowModal(true)
        setMsg('Fecting Data .....')
        axios.get<Rows[]>(`https://localhost:7060/api/data/GetPublicData?searchTerm=${search===''?'wind':search}`)
        .then((res)=>{
            console.log(res)
            setRows([...res.data.filter(data => data.id !== null)])
            setShowModal(false)

        })
        .catch(err => 
            {
                setMsg(err.response.data)
                setTimeout(()=>{
                    setShowModal(false)
                    setRows([])
                },1000)
                
                
            })
    }

    return(
        
        <div className='h-100  w-100 ' data-bs-theme="dark">
            
            <Modal visible={showModal}>
                <div className='d-flex '>
                    <div className="spinner-border mt-1">
                    </div>
                    <div className='ms-4'>
                        <h4>{msg}</h4>
                    </div>
                </div>
               
            </Modal>
            <div className='header bg-dark d-flex '>
               <img src={flame} className='ms-3 mt-2' style={{width:'40px',height:'40px'}} alt='Flame Image' />
               <h4 className='ms-2 mt-3 text-white'>Blazor</h4>
            </div>
            <div className='search p-3 pt-3 px-5 d-flex justify-content-center'>
                <div className='w-75 d-flex  '>
                    <div className='me-0 pe-0' style={{width:"90%"}}>
                        <FormInput 
                        label='Search'
                        value={search}
                        onChange={(e)=> setSearch(e.target.value)}
                            />
                    </div>
                    <div className='ms-0' style={{width:"10%"}}>
                        <button className='btn btn-dark fw-bold' style={{height:'55px',width:'55px'}}
                        onClick={()=> setIsSearch(!issearch)}
                        ><SearchIcon /></button>
                    </div>

                </div>
           
            </div>
            <div className='content d-flex justify-content-center p-2  rounded mx-2 'style={{overflow:"auto"}}>
            <AgGrid 
            rowData={rows}
            columnDefs={columns}
            />
            </div>
        </div>
    )



}

export default Home;