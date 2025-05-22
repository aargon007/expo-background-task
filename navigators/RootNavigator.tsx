import { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as BackgroundTask from 'expo-background-task';
import * as TaskManager from 'expo-task-manager';
import { useAppSelector } from "@/store/store";
import Home from "@/screens/Home";

export type ScreenNames = ["Home"];

const Stack = createNativeStackNavigator();

const BACKGROUND_TASK_IDENTIFIER = 'background-task';
TaskManager.defineTask(BACKGROUND_TASK_IDENTIFIER, async () => {
    try {
        console.log('background task');
        // send data to server
    } catch (error) {
        console.log(error);
        return BackgroundTask.BackgroundTaskResult.Failed;
    }
    return BackgroundTask.BackgroundTaskResult.Success;
});


const triggerTask = async () => {
    await BackgroundTask.triggerTaskWorkerForTestingAsync();
};

async function unregisterBackgroundTaskAsync() {
    return BackgroundTask.unregisterTaskAsync(BACKGROUND_TASK_IDENTIFIER);
};

const regiserBackgroundTask = async () => {
    return BackgroundTask.registerTaskAsync(BACKGROUND_TASK_IDENTIFIER);
}

export default function RootNavigator() {
    const { activePrinter } = useAppSelector(state => state.printer);

    useEffect(() => {
        if (activePrinter) {
            regiserBackgroundTask();
            // triggerTask(); //for dev build work fine
        } else {
            unregisterBackgroundTaskAsync();
        }
    }, [activePrinter])

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    );
}