import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import PreviewCard from '../../components/PreviewCard/PreviewCard'
import CardColumns from "react-bootstrap/CardColumns";

export default function Homepage() {
    const dispatch = useDispatch();
    // const parks = useSelector(selectParks);

    // useEffect(() => {
    //     dispatch(fetchParks());
    // }, [dispatch]);


    return (
        <div>
            <CardColumns>
                {/* {parks && parks.map(park => {
                    return (

                        <PreviewCard />

                    );
                })} */}

                <PreviewCard />
                <PreviewCard />
                <PreviewCard />
                <PreviewCard />
                <PreviewCard />
                <PreviewCard />
                <PreviewCard />
                <PreviewCard />

            </CardColumns>
        </div>
    )
}
