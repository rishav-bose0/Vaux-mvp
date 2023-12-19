import React from "react";
import { fetchProjectsListByUser } from "../../actions/APIActions";
import { useCookie } from "../../hooks/useCookie";
import { useEffect, useState } from "react"
import { VAUX_PROJECT_LIST_ITEM } from "../../utils/APIResponseTypes";
import ProjectFolder from "../../assets/project_folder.svg";
import { useNavigate } from "react-router";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import Loader from "../common/Loader";

function ProjectsList() {

    const navigate = useNavigate();

    const [token, setToken] = useLocalStorage("vaux-staff-token", JSON.stringify(null));
    const [userId] = useLocalStorage("userId", JSON.stringify(null));
    const [projectsList, setProjectsList] = useState<Array<VAUX_PROJECT_LIST_ITEM>>([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const getProjectsListByUSer = async () => {
            const data: VAUX_PROJECT_LIST_ITEM[] | { Error: string } | undefined = await fetchProjectsListByUser(token, userId);
            if (data && Array.isArray(data)) {
                setProjectsList(data)
            }
            // else if('Error' in data) {
            //     console.log(data.Error);
            //     setProjectsList([]);
            // }
            else {
                setProjectsList([]);
            }
            setLoading(false);
        }
        setLoading(true);
        getProjectsListByUSer();
    }, [token, userId]);

    const routeChange = (path: string, params?: any) => {
        navigate(path, { state: params });
    }

    const openProject = (id: string) => {
        routeChange(`/studio/projects/${id}`)
    }

    return (
        <>
            {loading && <Loader />}
            {!loading && <div>
                <div className="text-xl text-black font-semibold">{`Projects(${projectsList?.length ?? 0})`}</div>
                <div className="flex flex-wrap gap-12 py-4 my-4">
                    {
                        projectsList.map((project: VAUX_PROJECT_LIST_ITEM) => {
                            return (
                                <div key={project.id} className="flex flex-col border border-gray-300 rounded-lg items-center bg-white cursor-pointer hover:shadow-md"
                                    onClick={() => openProject(project.id)}>
                                    <div className="py-[3rem] px-[6rem] border-b border-b-gray-300">
                                        <img width={40} height={40} src={ProjectFolder} alt="project" />
                                    </div>
                                    <div className="px-4 py-2 text-sm font-semibold text-gray-600">
                                        {project.name}
                                        {/* {project.name.split('_').join(' ').toLocaleUpperCase()} */}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>}
        </>
    )
}

export default ProjectsList