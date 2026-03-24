import "../css/SVG.css"

function SVGPlus({fill, style, className, onClick}) {
    return (
        <svg onClick={onClick}
            className={className}
            style={style}
            viewBox="0 0 32 32" 
            fill={fill}>
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier"> 
                <title>plus</title> 
                <desc>Created with Sketch Beta.</desc> <defs></defs> 
                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" sketch:type="MSPage"> 
                    <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-362.000000, -1037.000000)" fill={fill}> 
                        <path d="M390,1049 L382,1049 L382,1041 C382,1038.79 380.209,1037 378,1037 C375.791,1037 374,1038.79 374,1041 L374,1049 L366,1049 C363.791,1049 362,1050.79 362,1053 C362,1055.21 363.791,1057 366,1057 L374,1057 L374,1065 C374,1067.21 375.791,1069 378,1069 C380.209,1069 382,1067.21 382,1065 L382,1057 L390,1057 C392.209,1057 394,1055.21 394,1053 C394,1050.79 392.209,1049 390,1049" id="plus" sketch:type="MSShapeGroup">
            </path>
            </g> 
            </g> 
            </g>
        </svg>
    );
}

function SVGMinus({fill, style, className, onClick}) {
    return (
    <svg 
        onClick={onClick}
        className={className}
        style={style}
        viewBox="0 -12 32 32" version="1.1" fill={fill}>
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier"> 
            <title>minus</title> 
            <desc>Created with Sketch Beta.</desc>
            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" sketch:type="MSPage"> 
                <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-414.000000, -1049.000000)" fill={fill}> 
                    <path d="M442,1049 L418,1049 C415.791,1049 414,1050.79 414,1053 C414,1055.21 415.791,1057 418,1057 L442,1057 C444.209,1057 446,1055.21 446,1053 C446,1050.79 444.209,1049 442,1049" id="minus" sketch:type="MSShapeGroup">
                    </path>
                </g>
            </g>
        </g>
    </svg>)
}

function SVGAccordianDown({fill, style, className, onClick}) {
    return (
        <svg onClick={onClick}
            className={className}
            style={style}
            viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
                <path d="M8 16L12 20M12 20L16 16M12 20V8M4 4H20" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> 
            </g>
        </svg>
    )
}

function SVGAccordianUp({fill, style, className, onClick}) {
    return (
        <svg onClick={onClick}
            className={className}
            style={style}
            viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier">
                <path d="M8 8L12 4M12 4L16 8M12 4V16M4 20H20" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            </g>
        </svg>
    )
}

export {SVGPlus, SVGMinus, SVGAccordianDown, SVGAccordianUp}