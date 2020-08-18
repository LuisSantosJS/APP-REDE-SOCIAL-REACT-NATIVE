import Realm from 'realm';
import FeedSchema from '../schemas/feedSchema';

export default function getRealm(){
    return Realm.open({
        schema:[FeedSchema]
    })
}