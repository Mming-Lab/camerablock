
enum Easing {
    //% block=""
    //% jres alias = ""
    in_quad,
    //% block=""
    //% jres alias = ""
    out_quad,
    //% block=""
    //% jres alias = ""
    in_out_quad,
    //% block=""
    //% jres alias = ""
    in_cubic,
    //% block=""
    //% jres alias = ""
    out_cubic,
    //% block=""
    //% jres alias = ""
    in_out_cubic,
    //% block=""
    //% jres alias = ""
    in_quart,
    //% block=""
    //% jres alias = ""
    out_quart,
    //% block=""
    //% jres alias = ""
    in_out_quart,
    //% block=""
    //% jres alias = ""
    in_quint,
    //% block=""
    //% jres alias = ""
    out_quint,
    //% block=""
    //% jres alias = ""
    in_out_quint,
    //% block=""
    //% jres alias = ""
    in_sine,
    //% block=""
    //% jres alias = ""
    out_sine,
    //% block=""
    //% jres alias = ""
    in_out_sine,
    //% block=""
    //% jres alias = ""
    in_expo,
    //% block=""
    //% jres alias = ""
    out_expo,
    //% block=""
    //% jres alias = ""
    in_out_expo,
    //% block=""
    //% jres alias = ""
    in_circ,
    //% block=""
    //% jres alias = ""
    out_circ,
    //% block=""
    //% jres alias = ""
    in_out_circ,
    //% block=""
    //% jres alias = ""
    in_bounce,
    //% block=""
    //% jres alias = ""
    out_bounce,
    //% block=""
    //% jres alias = ""
    in_out_bounce,
    //% block=""
    //% jres alias = ""
    in_back,
    //% block=""
    //% jres alias = ""
    out_back,
    //% block=""
    //% jres alias = ""
    in_out_back,
    //% block=""
    //% jres alias = ""
    in_elastic,
    //% block=""
    //% jres alias = ""
    out_elastic,
    //% block=""
    //% jres alias = ""
    in_out_elastic,
    //% block=""
    //% jres alias = ""
    linear,
    //% block=""
    //% jres alias = ""
    spring
}

enum CameraPreset {
    //% block="Free"
    Free,
    //% block="First Person"
    FirstPerson,
    //% block="Third Person"
    ThirdPerson,
    //% block="Third Person Front"
    ThirdPersonFront,
    //% block="Fixed Boom"
    FixedBoom
}

//%  block="Camera" weight=1 color=#54bfff icon="\uf03d"
namespace Camera {

    const COMMAND_BASE: string = `camera @s `;
    const FREE: string = `${COMMAND_BASE} set minecraft:free`;

    function _getPresetName(preset: CameraPreset): string {
        switch (preset) {
            case CameraPreset.Free: return "minecraft:free";
            case CameraPreset.FirstPerson: return "minecraft:first_person";
            case CameraPreset.ThirdPerson: return "minecraft:third_person";
            case CameraPreset.ThirdPersonFront: return "minecraft:third_person_front";
            case CameraPreset.FixedBoom: return "minecraft:fixed_boom";
            default:
                player.errorMessage("Unknown CameraPreset enum value");
                return "minecraft:free";
        }
    }

    //% block="Camera preset:%preset"
    //% weight=1010
    export function SetPreset(preset: CameraPreset): void {
        const presetName = _getPresetName(preset);
        const cmd = `${COMMAND_BASE} set ${presetName}`;
        player.execute(cmd);
    }

    //% block="Camera Clear after %time second"
    //% time.defl=0
    //% weight=1000
    export function CameraClear(time: number): void {
        loops.pause(time * 1000)//待機
        player.execute(`${COMMAND_BASE} clear`);
    }



    //% block="Camera position:%pos=minecraftCreateWorldPosition"
    //% weight=990
    export function Pos(pos: Position): void {
        const posCmd: string = `pos ${pos} `;//移動先座標
        // camera <players: target> set <preset: string> pos <position: x y z>
        const cmd: string = `${FREE} ${posCmd}`;//コマンド
        player.execute(cmd);//実行
    }

    //% group="Camera Angles"
    //% block="Camera position:%pos=minecraftCreateWorldPosition| subject:%facing"
    //% weight=980
    export function FacingEntity(pos: Position, facing: TargetSelectorKind): void {
        Pos(pos);//カメラ位置
        const facingCmd: string = `facing ${mobs.target(facing)}`;//被写体:
        //camera <players: target> set <preset: string> facing <lookAtEntity: target>
        const cmd: string = `${FREE} ${facingCmd}`;//コマンド
        //player.say(cmd);
        player.execute(cmd);//実行
    }

    //% group="Camera Angles"
    //% block="Camera position:%pos=minecraftCreateWorldPosition| subject:%facing| offset x:%x y:%y z:%z"
    //% x.defl=0 y.defl=0 z.defl=0
    //% weight=975
    export function FacingEntityWithOffset(pos: Position, facing: TargetSelectorKind, x: number, y: number, z: number): void {
        const posCmd: string = `pos ${pos} `;
        const facingCmd: string = `facing ${mobs.target(facing)} `;
        const offsetCmd: string = `entity_offset ${x} ${y} ${z}`;
        const cmd: string = `${FREE} ${posCmd}${facingCmd}${offsetCmd}`;
        player.execute(cmd);
    }

    //% group="Camera Angles"
    //% block="Camera position:%pos=minecraftCreateWorldPosition| position of subject:%facing=minecraftCreateWorldPosition"
    //% weight=970
    export function FacingPosition(pos: Position, facing: Position): void {
        Pos(pos);//カメラ位置
        const facingCmd: string = `facing ${facing}`;//目標座標:
        // camera <players: target> set <preset: string> facing <lookAtPosition: x y z>
        const cmd: string = `${FREE} ${facingCmd}`;//コマンド
        //player.say(cmd);
        player.execute(cmd);//実行
    }

    //% group="Camera Angles"
    //% block="Camera position:%pos=minecraftCreateWorldPosition| position of subject:%facing=minecraftCreateWorldPosition| view offset x:%x y:%y z:%z"
    //% x.defl=0 y.defl=0 z.defl=0
    //% weight=965
    export function FacingPositionWithViewOffset(pos: Position, facing: Position, x: number, y: number, z: number): void {
        const posCmd: string = `pos ${pos} `;
        const facingCmd: string = `facing ${facing} `;
        const offsetCmd: string = `view_offset ${x} ${y} ${z}`;
        const cmd: string = `${FREE} ${posCmd}${facingCmd}${offsetCmd}`;
        player.execute(cmd);
    }

    //% group="Camera Angles"
    //% block="Camera position:%pos=minecraftCreateWorldPosition| rotation| pitch:%xRot yaw:%yRot"
    //% xRot.min=-90 xRot.max=90
    //% yRot.min=-180 yRot.max=180
    //% weight=960
    export function Rot(pos: Position, xRot: number, yRot: number): void {
        Pos(pos);//カメラ位置
        const rotCmd: string = `rot ${xRot} ${yRot}`;//回転:
        // camera <players: target> set <preset: string> rot <xRot: value> <yRot: value>
        const cmd: string = `${FREE} ${rotCmd}`;//コマンド
        //player.say(cmd);
        player.execute(cmd);//実行
    }



    //% group="Camera Work"
    //% blockId=minecraftCameraEasePosition
    //% block="Camera smooth move| position:%pos=minecraftCreateWorldPosition| focus:%facing=minecraftCreateWorldPosition| easing:%easeType| time:%easeTime sec| auto clear:%isClear|| wait completion:%isPause"
    //% easeTime.defl=3
    //% easeType.fieldEditor="gridpicker"
    //% easeType.fieldOptions.width=90
    //% easeType.fieldOptions.columns=3
    //% easeType.fieldOptions.maxRows="6"
    //% isPause.defl=true
    //% isPause.shadow=toggleOnOff
    //% isClear.defl=true
    //% isClear.shadow=toggleOnOff
    //% weight=890
    export function EasePosition(pos: Position, facing: Position, easeType: Easing, easeTime: number, isClear: boolean = true, isPause: boolean = true): void {
        const easeCmd: string = `ease ${easeTime} ${_getEasingId(easeType)} `;//イージング
        const posCmd: string = `pos ${pos} `;//移動先座標
        const facingCmd: string = `facing ${facing}`;//目標座標:
        // camera <players: target> set <preset: string> ease <easeTime: float> <easeType: Easing> pos <position: x y z> facing <lookAtPosition: x y z>
        const cmd: string = `${FREE} ${easeCmd} ${posCmd} ${facingCmd}`;//コマンド
        //player.say(cmd);
        player.execute(cmd);//実行
        if (isPause) {
            loops.pause(easeTime * 1000)//待機
        }
        if (isClear) {
            CameraClear(0); //カメラワーク取消
        }
    }

    //% group="Camera Work"
    //% block="Camera track entity| position:%pos=minecraftCreateWorldPosition| target:%facing| easing:%easeType| time:%easeTime sec| auto clear:%isClear|| wait completion:%isPause"
    //% easeTime.defl=3
    //% easeType.fieldEditor="gridpicker"
    //% easeType.fieldOptions.width=90
    //% easeType.fieldOptions.columns=3
    //% easeType.fieldOptions.maxRows="6"
    //% isPause.defl=true
    //% isPause.shadow=toggleOnOff
    //% isClear.defl=true
    //% isClear.shadow=toggleOnOff
    //% weight=880
    export function EaseEntity(pos: Position, facing: TargetSelectorKind, easeType: Easing, easeTime: number, isClear: boolean = true, isPause: boolean = true): void {
        const easeCmd: string = `ease ${easeTime} ${_getEasingId(easeType)} `;//イージング
        const posCmd: string = `pos ${pos} `;//移動先座標
        const facingCmd: string = `facing ${mobs.target(facing)}`;//被写体:
        //camera <players: target> set <preset: string> ease <easeTime: float> <easeType: Easing> pos <position: x y z> facing <lookAtEntity: target>
        const cmd: string = `${FREE} ${easeCmd} ${posCmd} ${facingCmd}`;//コマンド
        //player.say(cmd);
        player.execute(cmd);//実行
        if (isPause) {
            loops.pause(easeTime * 1000)//待機
        }
        if (isClear) {
            CameraClear(0); //カメラワーク取消
        }
    }

    //% group="Camera Work"
    //% block="Camera smooth rotate| position:%pos=minecraftCreateWorldPosition| pitch:%xRot yaw:%yRot| easing:%easeType| time:%easeTime sec| auto clear:%isClear|| wait completion:%isPause"
    //% xRot.min=-90 xRot.max=90
    //% yRot.min=-180 yRot.max=180
    //% easeTime.defl=3
    //% easeType.fieldEditor="gridpicker"
    //% easeType.fieldOptions.width=90
    //% easeType.fieldOptions.columns=3
    //% easeType.fieldOptions.maxRows="6"
    //% isPause.defl=true
    //% isPause.shadow=toggleOnOff
    //% isClear.defl=true
    //% isClear.shadow=toggleOnOff
    //% weight=870
    export function EaseRot(pos: Position, xRot: number, yRot: number, easeType: Easing, easeTime: number, isClear: boolean = true, isPause: boolean = true): void {
        const easeCmd: string = `ease ${easeTime} ${_getEasingId(easeType)} `;//イージング
        const posCmd: string = `pos ${pos} `;//移動先座標
        const rotCmd: string = `rot ${xRot} ${yRot}`;//回転:
        // camera <players: target> set <preset: string> ease <easeTime: float> <easeType: Easing> pos <position: x y z> rot <xRot: value> <yRot: value>
        const cmd: string = `${FREE} ${easeCmd} ${posCmd} ${rotCmd}`;//コマンド
        //player.say(cmd);
        player.execute(cmd);//実行
        if (isPause) {
            loops.pause(easeTime * 1000)//待機
        }
        if (isClear) {
            CameraClear(0); //カメラワーク取消
        }
    }

    //% group="Fade"
    //% block="Fade| In(sec):%fadeInSeconds| Hold(sec):%holdSeconds| Out(sec):%fadeOutSeconds| color:%colorCode=colorNumberPicker| Camera Clear:%isClear"
    //% fadeInSeconds.defl=1
    //% holdSeconds.defl=1
    //% fadeOutSeconds.defl=0
    //% colorCode.defl=0x000000
    //% isClear.defl=false
    //% isClear.shadow=toggleOnOff
    //% weight=790
    export function fadeTime(fadeInSeconds: number, holdSeconds: number, fadeOutSeconds: number, colorCode: number, isClear: boolean): void {
        const fadeTimeCmd: string = `fade time ${fadeInSeconds} ${holdSeconds} ${fadeOutSeconds} `
        const red = (colorCode >> 16) & 0xFF;
        const green = (colorCode >> 8) & 0xFF;
        const blue = colorCode & 0xFF;
        const colorCmd: string = `color ${red} ${green} ${blue} `
        //camera <players: target> fade time <fadeInSeconds: float> <holdSeconds: float> <fadeOutSeconds: float> color <red: int> <green: int> <blue: int>
        const cmd: string = `${COMMAND_BASE} ${fadeTimeCmd} ${colorCmd}`;
        //player.say(cmd);
        player.execute(cmd);//実行
        loops.pause((fadeInSeconds + holdSeconds + fadeOutSeconds) * 1000)//待機
        if (isClear) {
            CameraClear(0); //カメラワーク取消
        }
    }

    //% group="Fade"
    //% block="red%red| green%green|blue%blue"
    //% red.min=0 red.max=255 
    //% green.min=0 green.max=255
    //% blue.min=0 blue.max=255
    //% weight=780
    export function rgb(red: number, green: number, blue: number): number {
        return ((red & 0xFF) << 16) | ((green & 0xFF) << 8) | (blue & 0xFF);
    }

    //% group="Fade"
    //% block="%color=colorNumberPicker"
    //% color.defl=0xff0000
    //% weight=770
    export function setcolors(color: number): number {
        return color;
    }

    //% group="Camera Settings"
    //% block="Camera FOV:%fov"
    //% fov.min=10 fov.max=170
    //% fov.defl=90
    //% weight=750
    export function SetFOV(fov: number): void {
        const cmd: string = `${COMMAND_BASE} set minecraft:free fov ${fov}`;
        player.execute(cmd);
    }

    //% group="Camera Position"
    //% block="Camera relative to player| forward:%forward right:%right up:%up"
    //% forward.defl=0 right.defl=0 up.defl=5
    //% weight=940
    export function SetRelativeToPlayer(forward: number, right: number, up: number): void {
        const cmd: string = `${COMMAND_BASE} set minecraft:free pos ^${right} ^${up} ^${forward}`;
        player.execute(cmd);
    }

    //% group="Camera Position"
    //% block="Camera distance from player:%distance| facing player"
    //% distance.defl=10
    //% weight=930
    export function SetDistanceFromPlayer(distance: number): void {
        const cmd: string = `${COMMAND_BASE} set minecraft:free pos ^0 ^0 ^${distance} facing @s`;
        player.execute(cmd);
    }

    //% group="Camera Position"
    //% block="Camera above player| height:%height"
    //% height.defl=10
    //% weight=920
    export function SetAbovePlayer(height: number): void {
        const cmd: string = `${COMMAND_BASE} set minecraft:free pos ^0 ^${height} ^0 facing @s`;
        player.execute(cmd);
    }

    //% group="Camera Angles"
    //% block="Camera face self"
    //% weight=950
    export function FaceSelf(): void {
        const cmd: string = `${COMMAND_BASE} set minecraft:free facing @s`;
        player.execute(cmd);
    }

    export function _getEasingId(id: Easing) {
        switch (id) {
            case Easing.linear: return "linear";
            case Easing.spring: return "spring";
            case Easing.in_quad: return "in_quad";
            case Easing.out_quad: return "out_quad";
            case Easing.in_out_quad: return "in_out_quad";
            case Easing.in_cubic: return "in_cubic";
            case Easing.out_cubic: return "out_cubic";
            case Easing.in_out_cubic: return "in_out_cubic";
            case Easing.in_quart: return "in_quart";
            case Easing.out_quart: return "out_quart";
            case Easing.in_out_quart: return "in_out_quart";
            case Easing.in_quint: return "in_quint";
            case Easing.out_quint: return "out_quint";
            case Easing.in_out_quint: return "in_out_quint";
            case Easing.in_sine: return "in_sine";
            case Easing.out_sine: return "out_sine";
            case Easing.in_out_sine: return "in_out_sine";
            case Easing.in_expo: return "in_expo";
            case Easing.out_expo: return "out_expo";
            case Easing.in_out_expo: return "in_out_expo";
            case Easing.in_circ: return "in_circ";
            case Easing.out_circ: return "out_circ";
            case Easing.in_out_circ: return "in_out_circ";
            case Easing.in_bounce: return "in_bounce";
            case Easing.out_bounce: return "out_bounce";
            case Easing.in_out_bounce: return "in_out_bounce";
            case Easing.in_back: return "in_back";
            case Easing.out_back: return "out_back";
            case Easing.in_out_back: return "in_out_back";
            case Easing.in_elastic: return "in_elastic";
            case Easing.out_elastic: return "out_elastic";
            case Easing.in_out_elastic: return "in_out_elastic";
            default:
                player.errorMessage("Unknown Easing enum value");
                return undefined;
        }
    }

}
