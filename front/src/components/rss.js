import React from 'react';
import { Container, Card, Divider  , CardHeader, Link   } from '@material-ui/core';

export default (props) => {
    return (<Container>
        <CardHeader title ={props.location.state.rss.title}/>
        <div>{props.location.state.rss.description}</div>
        {props.location.state.rss.items.map(item => <Card style={{paddingTop: '30px'}}>
            <div>{item.title}</div>
            <div>{item.pubDate}</div>
            <Link target="_blank" href={item.link}>{item.link}</Link>
        </Card>)}

    </Container>)
}
