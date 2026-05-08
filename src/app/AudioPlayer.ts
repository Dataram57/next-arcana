export class AudioPlayer {
    private sounds: Map<string, HTMLAudioElement> = new Map();

    /**
     * Load a sound
     */
    load(name: string, src: string) {
        const audio = new Audio(src);
        this.sounds.set(name, audio);
    }

    /**
     * Play a sound
     */
    play(name: string, volume: number = 1) {
        const original = this.sounds.get(name);

        if (!original) {
            console.warn(`Sound "${name}" not found`);
            return;
        }

        // Clone allows many simultaneous plays
        const audio = original.cloneNode() as HTMLAudioElement;

        audio.volume = volume;
        audio.play().catch(console.error);
    }

    /**
     * Stop all currently loaded sounds
     */
    stopAll() {
        this.sounds.forEach((audio) => {
            audio.pause();
            audio.currentTime = 0;
        });
    }
}