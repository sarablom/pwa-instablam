import React from "react";

function Counter({ count }) {
    return (
        <>
            <p className="countdown">Taking picture in</p>
            <p className="animation">{count}</p>
        </>
    );
}

export default Counter;
