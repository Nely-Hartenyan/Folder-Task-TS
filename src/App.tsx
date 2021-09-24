import Container from "./Components/Container";
import {Route, Switch} from "react-router-dom";
import TextItem from "./Components/FolderAndTextItems/TextItems";
import FolderItems from "./Components/FolderAndTextItems/FolderItems";
import { useSelector } from "react-redux";
import TrashPage from "./Components/Trash/TrashPage"
import {DefaultStateType} from "./Components/Type/Type";
import {FC} from "react";

const App:FC = () => {

    const {items} = useSelector((state:DefaultStateType) => state);
    const {trashItems} = useSelector((state:DefaultStateType) => state);

    return (
        <div>
            <Switch>
                <Route exact path = "/">
                    <Container items = { items }/>
                </Route>
                <Route path = '/folder/:Folderid'>
                    <FolderItems items= { items }/>
                </Route>
                <Route path = '/text/:Docid'>
                    <TextItem items = {items}/>
                </Route>
                <Route path = '/trash'>
                    <TrashPage trash = { trashItems } items = { items } />
                </Route>

            </Switch>
        </div>
    );
}

export default App;
