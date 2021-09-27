import Container from "./Components/Container";
import {Route, Switch} from "react-router-dom";
import TextItem from "./Components/FolderAndTextItems/TextItems";
import FolderItems from "./Components/FolderAndTextItems/FolderItems";
import { useSelector } from "react-redux";
import TrashPage from "./Components/Trash/TrashPage"
import {FC} from "react";
import {RootState} from "./Toolkit/storeToolkit";

const App:FC = () => {

    const {items} = useSelector((state:RootState) => state.fileFolder);
    const {trashItems} = useSelector((state:RootState) => state.fileFolder);


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
