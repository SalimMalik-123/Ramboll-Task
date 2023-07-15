import React, { Fragment, useEffect } from 'react'


interface Props {
    children?: React.ReactNode
    cardHeader?: React.ReactNode
    visible?: boolean
    cardClass?: string
    cardHeaderClass?: string
    cardBodyClass?: string
    cardFooterClass?: string
    modalWrapperClass?: string
    cardFooter?: React.ReactNode
    ZIndex?: number
}


const Modal = ({ cardBodyClass, cardClass, cardFooter, cardFooterClass, cardHeader, cardHeaderClass, children, modalWrapperClass, visible ,ZIndex}: Props) => {

    useEffect(() => {
        const bodyElement = document.querySelector('body')
        if (visible && bodyElement) {
            bodyElement.classList.add('overflow-hidden')
        } else if (!visible && bodyElement) {
            bodyElement.classList.remove('overflow-hidden')
        }
    }, [visible])

    return <Fragment>
        {visible && <div className={`modal-wrapper p-2 position-fixed top-0 start-0 vw-100 vh-100 d-flex align-items-center justify-content-center overflow-hidden ${modalWrapperClass}` } style={{zIndex:ZIndex}}>
            <div className={`card ${cardClass}`}>
                {cardHeader !== undefined && <div className={`card-header ${cardHeaderClass}`}>
                    {cardHeader}
                </div>}
                <div className={`card-body overflow-auto ${cardBodyClass}`}>{children}</div>
                {cardFooter !== undefined && <div className={`card-footer ${cardFooterClass}`}>
                    {cardFooter}
                </div>}
            </div>
        </div>}
    </Fragment>
}

export default Modal