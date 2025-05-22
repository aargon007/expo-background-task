import React, { useEffect } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import * as BackgroundTask from 'expo-background-task';
import * as TaskManager from 'expo-task-manager';

const Home = () => {
    const [registered, setRegistered] = React.useState<TaskManager.TaskManagerTask[]>();
    const [status, setStatus] = React.useState<BackgroundTask.BackgroundTaskStatus | null>(null);

    useEffect(() => {
       updateAsync(); 
    },[]);

    const updateAsync = async () => {
        const status = await BackgroundTask.getStatusAsync();
        setStatus(status);
        // this not exist
        // const isRegistered = await BackgroundTask.isTaskRegisteredAsync(BACKGROUND_TASK_IDENTIFIER);
        const isRegistered = await TaskManager.getRegisteredTasksAsync();
        setRegistered(isRegistered);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{flex:1, justifyContent: "center", alignItems: "center" }}>
                <Text>
                    Status : {status}
                </Text>
                <Text>
                    Registered Task: {registered?.map((task) => task.taskName).join(", ")}
                </Text>
            </View>
        </SafeAreaView>
    );
};

export default Home;