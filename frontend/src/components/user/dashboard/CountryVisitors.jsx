import React from "react";
import VisitorsByCountryForm from "./VisitorsByCountryForm";
import VisualRepresentationMap from "./VisualRepresentationMap";

function CountryVisitors() {

    return (
        <section className="flex flex-wrap gap-6 items-center mt-6 mx-6 max-md:mr-2.5">
            <VisitorsByCountryForm />
            <VisualRepresentationMap />
        </section>
    );
}

export default CountryVisitors;
