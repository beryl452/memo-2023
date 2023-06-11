
import React, { useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import DropdownA from "./DropdownA";

const TableBadges = ({ }) => {
  const navigate = useNavigate();

  const [badges, setBadges] = React.useState({});
  const [search, setSearch] = React.useState("");
  //   const [seeAbsence, setSeeAbsence] = React.useState(false);
  const location = useLocation();
  const [success, setSuccess] = React.useState({
    'is_active': '',
    'badge': '',
    'alert': ''
  });
  const auth = JSON.parse(localStorage.getItem("auth") || "{}");
  const http = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + auth.token,
    },
    withCredentials: true,
  });
  async function viewBadges() {
    const response = await http.get("/api/badge");
    console.log("badges", response.data.Badge);
    setBadges(response.data.Badge);
    console.log(badges);
  }
  useEffect(() => {
    viewBadges();
  }, []);
  return (
    <div className="dark:border-strokedark dark:bg-boxdark relative shadow-md sm:rounded-lg overflow-hidden">
      {
        ((success.alert != '') && (success.is_active == true)) && (
          <div className="flex w-full border-l-6 border-[#34D399] bg-[#34D399] bg-opacity-[15%] px-7 py-8 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-4">
            <div className="mr-5 flex h-9 w-full max-w-[36px] items-center justify-center rounded-lg bg-[#34D399]">
              <svg
                width="13"
                height="13"
                viewBox="0 0 16 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.2984 0.826822L15.2868 0.811827L15.2741 0.797751C14.9173 0.401867 14.3238 0.400754 13.9657 0.794406L5.91888 9.45376L2.05667 5.2868C1.69856 4.89287 1.10487 4.89389 0.747996 5.28987C0.417335 5.65675 0.417335 6.22337 0.747996 6.59026L0.747959 6.59029L0.752701 6.59541L4.86742 11.0348C5.14445 11.3405 5.52858 11.5 5.89581 11.5C6.29242 11.5 6.65178 11.3355 6.92401 11.035L15.2162 2.11161C15.5833 1.74452 15.576 1.18615 15.2984 0.826822Z"
                  fill="white"
                  stroke="white"
                ></path>
              </svg>
            </div>
            <div className="w-full">
              <h5 className="mb-3 text-lg font-semibold text-black dark:text-[#34D399] ">
                Badge Activated
              </h5>
              <p className="text-base leading-relaxed text-body">
                The badge {success.badge} is now activated
              </p>
            </div>
          </div>)
      }
      {((success.alert != '') && (success.is_active == false)) && (<div className="flex mb-5 w-full border-l-6 border-[#F87171] bg-[#F87171] bg-opacity-[15%] px-7 py-8 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-4">
        <div className="mr-5 flex h-9 w-full max-w-[36px] items-center justify-center rounded-lg bg-[#F87171]">
          <svg
            width="13"
            height="13"
            viewBox="0 0 13 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.4917 7.65579L11.106 12.2645C11.2545 12.4128 11.4715 12.5 11.6738 12.5C11.8762 12.5 12.0931 12.4128 12.2416 12.2645C12.5621 11.9445 12.5623 11.4317 12.2423 11.1114C12.2422 11.1113 12.2422 11.1113 12.2422 11.1113C12.242 11.1111 12.2418 11.1109 12.2416 11.1107L7.64539 6.50351L12.2589 1.91221L12.2595 1.91158C12.5802 1.59132 12.5802 1.07805 12.2595 0.757793C11.9393 0.437994 11.4268 0.437869 11.1064 0.757418C11.1063 0.757543 11.1062 0.757668 11.106 0.757793L6.49234 5.34931L1.89459 0.740581L1.89396 0.739942C1.57364 0.420019 1.0608 0.420019 0.740487 0.739944C0.42005 1.05999 0.419837 1.57279 0.73985 1.89309L6.4917 7.65579ZM6.4917 7.65579L1.89459 12.2639L1.89395 12.2645C1.74546 12.4128 1.52854 12.5 1.32616 12.5C1.12377 12.5 0.906853 12.4128 0.758361 12.2645L1.1117 11.9108L0.758358 12.2645C0.437984 11.9445 0.437708 11.4319 0.757539 11.1116C0.757812 11.1113 0.758086 11.111 0.75836 11.1107L5.33864 6.50287L0.740487 1.89373L6.4917 7.65579Z"
              fill="#ffffff"
              stroke="#ffffff"
            ></path>
          </svg>
        </div>
        <div className="w-full">
          <h5 className="mb-3 font-semibold text-[#B45454]">
            Badge Desactived
          </h5>
          <ul>
            <li className="leading-relaxed text-[#CD5D5D]">
              The badge {success.badge} is now desactived
            </li>
          </ul>
        </div>
      </div>)}
      <div className="flex flex-col md:flex-row justify-around space-y-3 md:space-y-0 md:space-x-4 p-4">
        <div className="w-full md:w-1/2">
          <form className="flex items-center">
            <label htmlFor="simple-search" className="sr-only">Search </label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-black dark:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="simple-search"
                className="dark:border-strokedark dark:bg-boxdark border text-gray-900 text-sm rounded-lg focus:ring-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Search"
                required
                value={search}
                onChange={
                  async (e) => {
                    setSearch(e.target.value);
                    const url = "api/badge?search=".concat(search);
                    console.log("url =", url);
                    const response = await http.get(url);
                    console.log("search =", response.data);
                    console.log("search =", response.data);
                    setBadges(response.data.Badge);
                    console.log("seacdcdrch =", badges);
                  }
                }
              />
            </div>
          </form>
        </div>
        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
          <button
            onClick={() => {
              navigate('/Createbadges', { replace: true })
            }
            }
            className="flex justify-center  items-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
            type="submit"
          >
            <svg
              className="h-3.5 w-3.5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              />
            </svg>
            Create Badge
          </button>

        </div>
      </div>
      <>
        <div className="overflow-x-auto">
          <table className="font-medium w-full text-sm text-left text-black dark:text-white">
            <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700 text-black dark:text-white">
              <tr>
                <th scope="col" className="px-4 py-3 text-center">
                  Username
                </th>
                <th scope="col" className="px-4 py-3 text-center">
                  Card Number
                </th>
                <th scope="col" className="px-4 py-3 text-center">
                  Active
                </th>
                <th scope="col" className="px-4 py-3 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {/* {JSON.stringify(badges)} */}
              {badges ? (
                badges.data?.map((badge, index) => (
                  <tr
                    key={index}
                    className="dark:border-gray-700 border-b text-sm font-medium"
                    onClick={() => {
                      // navigate(`/badges/${absence.id}/contracts`, { state: { absence: absence } }, {replace: true})
                    }}
                  >
                    <th
                      scope="row"
                      className="whitespace-nowrap px-4 py-3 text-black dark:text-white text-center"
                    >
                      {badge.user[0]? badge.user[0].username : "No user"} {badge.id}
                    </th>
                    <th
                      className="px-4 py-3 text-center"
                    >
                      {badge.serial_number}
                    </th>
                    <td className="px-4 py-3 text-center">
                      <input type="checkbox" className="form-checkbox h-5 w-5 "
                        onChange={async () => {
                          // const url = "api/absence/validate/".concat(absence.id);
                          await http.put(`api/badge/activation/${badge.id}`)
                            .then((response) => {
                              const newBadges = { ...badges };
                              newBadges.data[index].is_active = !newBadges.data[index].is_active;
                              setBadges(newBadges);
                              setTimeout(() => {
                                setSuccess({
                                  'is_active': badge.is_active,
                                  'badge': badge.serial_number
                                });
                              }, 2000);
                              console.log("response.data.badges =", response.data);
                            })
                            .catch((error) => {
                              console.log("error =", error);
                            });
                        }}
                        checked={badge.is_active} />
                    </td>
                    <td className="px-4 py-4 text-center">
                      <DropdownA>
                        <button
                          onClick={() => {
                            navigate(`/badge/${badge.id}/edit`, { state: { badge: badge } }, { replace: true })
                          }}
                          className="flex w-full items-center gap-2 rounded-sm py-1.5 px-4 text-left text-sm hover:bg-gray dark:hover:bg-meta-4">
                          <svg
                            className="fill-current"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_62_9787)">
                              <path
                                d="M15.55 2.97499C15.55 2.77499 15.475 2.57499 15.325 2.42499C15.025 2.12499 14.725 1.82499 14.45 1.52499C14.175 1.24999 13.925 0.974987 13.65 0.724987C13.525 0.574987 13.375 0.474986 13.175 0.449986C12.95 0.424986 12.75 0.474986 12.575 0.624987L10.875 2.32499H2.02495C1.17495 2.32499 0.449951 3.02499 0.449951 3.89999V14C0.449951 14.85 1.14995 15.575 2.02495 15.575H12.15C13 15.575 13.725 14.875 13.725 14V5.12499L15.35 3.49999C15.475 3.34999 15.55 3.17499 15.55 2.97499ZM8.19995 8.99999C8.17495 9.02499 8.17495 9.02499 8.14995 9.02499L6.34995 9.62499L6.94995 7.82499C6.94995 7.79999 6.97495 7.79999 6.97495 7.77499L11.475 3.27499L12.725 4.49999L8.19995 8.99999ZM12.575 14C12.575 14.25 12.375 14.45 12.125 14.45H2.02495C1.77495 14.45 1.57495 14.25 1.57495 14V3.87499C1.57495 3.62499 1.77495 3.42499 2.02495 3.42499H9.72495L6.17495 6.99999C6.04995 7.12499 5.92495 7.29999 5.87495 7.49999L4.94995 10.3C4.87495 10.5 4.92495 10.675 5.02495 10.85C5.09995 10.95 5.24995 11.1 5.52495 11.1H5.62495L8.49995 10.15C8.67495 10.1 8.84995 9.97499 8.97495 9.84999L12.575 6.24999V14ZM13.5 3.72499L12.25 2.49999L13.025 1.72499C13.225 1.92499 14.05 2.74999 14.25 2.97499L13.5 3.72499Z"
                                fill=""
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_62_9787">
                                <rect width="16" height="16" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                          Edit
                        </button>
                        <button
                          onClick={async () => {
                            await http.delete(`api/badge/delete/${badge.id}`)
                            .then((response) => {
                             navigate('/badges', { replace: true });
                            })
                            .catch((error) => {
                              console.log("error =", error);
                            });
                          }}
                          className="flex w-full items-center gap-2 rounded-sm py-1.5 px-4 text-left text-sm hover:bg-gray dark:hover:bg-meta-4">
                          <svg
                            className="fill-current"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12.225 2.20005H10.3V1.77505C10.3 1.02505 9.70005 0.425049 8.95005 0.425049H7.02505C6.27505 0.425049 5.67505 1.02505 5.67505 1.77505V2.20005H3.75005C3.02505 2.20005 2.42505 2.80005 2.42505 3.52505V4.27505C2.42505 4.82505 2.75005 5.27505 3.22505 5.47505L3.62505 13.75C3.67505 14.775 4.52505 15.575 5.55005 15.575H10.4C11.425 15.575 12.275 14.775 12.325 13.75L12.75 5.45005C13.225 5.25005 13.55 4.77505 13.55 4.25005V3.50005C13.55 2.80005 12.95 2.20005 12.225 2.20005ZM6.82505 1.77505C6.82505 1.65005 6.92505 1.55005 7.05005 1.55005H8.97505C9.10005 1.55005 9.20005 1.65005 9.20005 1.77505V2.20005H6.85005V1.77505H6.82505ZM3.57505 3.52505C3.57505 3.42505 3.65005 3.32505 3.77505 3.32505H12.225C12.325 3.32505 12.425 3.40005 12.425 3.52505V4.27505C12.425 4.37505 12.35 4.47505 12.225 4.47505H3.77505C3.67505 4.47505 3.57505 4.40005 3.57505 4.27505V3.52505V3.52505ZM10.425 14.45H5.57505C5.15005 14.45 4.80005 14.125 4.77505 13.675L4.40005 5.57505H11.625L11.25 13.675C11.2 14.1 10.85 14.45 10.425 14.45Z"
                              fill=""
                            />
                            <path
                              d="M8.00005 8.1001C7.70005 8.1001 7.42505 8.3501 7.42505 8.6751V11.8501C7.42505 12.1501 7.67505 12.4251 8.00005 12.4251C8.30005 12.4251 8.57505 12.1751 8.57505 11.8501V8.6751C8.57505 8.3501 8.30005 8.1001 8.00005 8.1001Z"
                              fill=""
                            />
                            <path
                              d="M9.99994 8.60004C9.67494 8.57504 9.42494 8.80004 9.39994 9.12504L9.24994 11.325C9.22494 11.625 9.44994 11.9 9.77494 11.925C9.79994 11.925 9.79994 11.925 9.82494 11.925C10.1249 11.925 10.3749 11.7 10.3749 11.4L10.5249 9.20004C10.5249 8.87504 10.2999 8.62504 9.99994 8.60004Z"
                              fill=""
                            />
                            <path
                              d="M5.97497 8.60004C5.67497 8.62504 5.42497 8.90004 5.44997 9.20004L5.62497 11.4C5.64997 11.7 5.89997 11.925 6.17497 11.925C6.19997 11.925 6.19997 11.925 6.22497 11.925C6.52497 11.9 6.77497 11.625 6.74997 11.325L6.57497 9.12504C6.57497 8.80004 6.29997 8.57504 5.97497 8.60004Z"
                              fill=""
                            />
                          </svg>
                          Delete
                        </button>
                      </DropdownA>
                    </td>
                  </tr>
                ))
              ) : (
                <></>
              )}
            </tbody>
          </table>
        </div>
        <nav
          className="flex flex-col items-start justify-between space-y-3 p-4 md:flex-row md:items-center md:space-y-0"
          aria-label="Table navigation"
        >
          <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            Showing
            <span className="text-gray-900 font-medium dark:text-white">
              {' '.concat((badges.meta ? badges.meta.from : 0), ' ')} - {' '.concat((badges.meta ? badges.meta.to : 0), ' ')}
            </span>
            of
            <span className="text-gray-900 font-medium dark:text-white">
              {' '.concat((badges.meta ? badges.meta.total : 0), ' ')}
            </span>
          </span>

          <ul className="inline-flex items-stretch  -space-x-px dark:border-strokedark dark:bg-boxdark">
            {badges ? (
              badges.meta ? (
                badges.meta.links.length > 3 && (
                  <>
                    {badges.meta.links.map((link, key) =>
                      link.label === '&laquo; Previous' ? (
                        <li key={key}>
                          <a
                            onClick={async () => {
                              if (badges.links.prev != null) {
                                const response = await http.get(
                                  badges.links.prev
                                );
                                setBadges(response.data.Badge);
                              } else {
                                console.log('no more pages');
                              }
                            }}
                            key={key}
                            className="text-gray-500 border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 ml-0 flex h-full cursor-pointer items-center justify-center rounded-l-lg border py-1.5 px-3 dark:border-strokedark dark:bg-boxdark dark:hover:text-white"
                          >
                            <span className="sr-only dark:border-strokedark  dark:bg-boxdark">
                              Previous
                            </span>
                            <svg
                              className="h-5 w-5"
                              aria-hidden="true"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </a>
                        </li>
                      ) : link.label === 'Next &raquo;' ? (
                        <li key={key}>
                          <a
                            onClick={async () => {
                              if (badges.links.next != null) {
                                const response = await http.get(
                                  badges.links.next
                                );
                                setBadges(response.data.Badge);
                              } else {
                                console.log('no more pages');
                              }
                            }}
                            key={key}
                            className="text-gray-500 border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 flex  h-full cursor-pointer items-center justify-center rounded-r-lg border py-1.5 px-3 leading-tight dark:border-strokedark dark:bg-boxdark dark:hover:text-white"
                          >
                            <span className="sr-only">Next</span>
                            <svg
                              className="h-5 w-5"
                              aria-hidden="true"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </a>
                        </li>
                      ) : (
                        <li key={key}>
                          <a
                            onClick={async () => {
                              const response = await http.get(link.url);
                              setBadges(response.data.Badge);
                            }}
                            key={key}
                            className="text-gray-500 border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 flex cursor-pointer items-center justify-center border py-2 px-3 text-sm leading-tight dark:border-strokedark dark:bg-boxdark dark:hover:text-white"
                          >
                            {link.label}
                          </a>
                        </li>
                      )
                    )}
                  </>
                )
              ) : (
                <></>
              )
            ) : (
              <></>
            )}
            <> </>
          </ul>
        </nav>
      </>
    </div>
  );
};

export default TableBadges;