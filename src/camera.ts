
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

/**
 * Custom blocks
 */
//% weight=1 color=#54bfff icon="\uf03d" block="カメラ"
namespace Camera {

    const COMMND_BASE: string = `camera @s `;
    const FREE: string = `${COMMND_BASE} set minecraft:free`;

    //% block="カメラ位置:%pos=minecraftCreateWorldPosition"
    //% weight=990
    export function Pos(pos: Position): void {
        const posCmd: string = `pos ${pos} `;//移動先座標
        // camera <players: target> set <preset: string> pos <position: x y z>
        const cmd: string = `${FREE} ${posCmd}`;//コマンド
        player.execute(cmd);//実行
    }


    //% block="被写体:%facing"
    //% weight=980
    export function FacingEntity(facing: TargetSelectorKind): void {
        const facingCmd: string = `facing ${mobs.target(facing)}`;//被写体:
        //camera <players: target> set <preset: string> facing <lookAtEntity: target>
        const cmd: string = `${FREE} ${facingCmd}`;//コマンド
        //player.say(cmd);
        player.execute(cmd);//実行
    }


    //% block="被写座標:%facing=minecraftCreateWorldPosition"
    //% weight=970
    export function FacingPosition(facing: Position): void {
        const facingCmd: string = `facing ${facing}`;//目標座標:
        // camera <players: target> set <preset: string> facing <lookAtPosition: x y z>
        const cmd: string = `${FREE} ${facingCmd}`;//コマンド
        //player.say(cmd);
        player.execute(cmd);//実行
    }

    //% block="カメラ回転| ピッチ:%xRot ヨー:%yRot"
    //% xRot.min=-90 xRot.max=90
    //% yRot.min=-180 yRot.max=180
    //% weight=960
    export function Rot(xRot: number, yRot: number): void {
        const rotCmd: string = `rot ${xRot} ${yRot}`;//回転:
        // camera <players: target> set <preset: string> rot <xRot: value> <yRot: value>
        const cmd: string = `${FREE} ${rotCmd}`;//コマンド
        //player.say(cmd);
        player.execute(cmd);//実行
    }

    //% block="%time秒後にカメラ終了"
    //% time.defl=0
    //% weight=950
    export function CameraClear(time: number): void {
        loops.pause(time * 1000)//待機
        player.execute(`${COMMND_BASE} clear`);
    }


    //% group="ワーク"
    //% blockId=minecraftCameraEasePosition
    //% block="座標ワーク| 被写座標:%facing=minecraftCreateWorldPosition| カメラ位置:%pos=minecraftCreateWorldPosition| イージング種類:%easeType| イージング秒:%easeTime| カメラ終了:%isClear|| ワーク中停止:%isPause"
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
    export function EasePosition(facing: Position, pos: Position, easeType: Easing, easeTime: number, isClear: boolean = true, isPause: boolean = true): void {
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

    //% group="ワーク"
    //% block="被写体ワーク| 被写体:%facing| カメラ位置:%pos=minecraftCreateWorldPosition| イージング種類:%easeType| イージング秒:%easeTime| カメラ終了:%isClear|| ワーク中停止:%isPause"
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
    export function EaseEntity(facing: TargetSelectorKind, pos: Position, easeType: Easing, easeTime: number, isClear: boolean = true, isPause: boolean = true): void {
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

    //% group="ワーク"
    //% block="回転ワーク| ピッチ:%xRotヨー:%yRot| カメラ位置:%pos=minecraftCreateWorldPosition| イージング種類:%easeType| イージング秒:%easeTime| カメラ終了:%isClear|| ワーク中停止:%isPause"
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
    export function EaseRot(xRot: number, yRot: number, pos: Position, easeType: Easing, easeTime: number, isClear: boolean = true, isPause: boolean = true): void {
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

    //% group="フェード"
    //% block="フェード| イン秒:%fadeInSeconds| 停止秒:%holdSeconds| アウト秒:%fadeOutSeconds| 色:%colorCode=colorNumberPicker| カメラ終了:%clear"
    //% fadeInSeconds.defl=1
    //% holdSeconds.defl=1
    //% fadeOutSeconds.defl=0
    //% colorCode.defl=0x000000
    //% clear.defl=false
    //% clear.shadow=toggleOnOff
    //% weight=790
    export function fadeTime(fadeInSeconds: number, holdSeconds: number, fadeOutSeconds: number, colorCode: number, clear: boolean): void {
        const fadeTimeCmd: string = `fade time ${fadeInSeconds} ${holdSeconds} ${fadeOutSeconds} `
        const red = (colorCode >> 16) & 0xFF;
        const green = (colorCode >> 8) & 0xFF;
        const blue = colorCode & 0xFF;
        const colorCmd: string = `color ${red} ${green} ${blue} `
        //camera <players: target> fade time <fadeInSeconds: float> <holdSeconds: float> <fadeOutSeconds: float> color <red: int> <green: int> <blue: int>
        const cmd: string = `${COMMND_BASE} ${fadeTimeCmd} ${colorCmd}`;
        //player.say(cmd);
        player.execute(cmd);//実行
        loops.pause((fadeInSeconds + holdSeconds + fadeOutSeconds) * 1000)//待機
        if (clear) {
            CameraClear(0); //カメラワーク取消
        }
    }

    //% group="フェード"
    //% block="赤%red| 緑%green|青%blue"
    //% red.min=0 red.max=255 
    //% green.min=0 green.max=255
    //% blue.min=0 blue.max=255
    //% weight=780
    export function rgb(red: number, green: number, blue: number): number {
        return ((red & 0xFF) << 16) | ((green & 0xFF) << 8) | (blue & 0xFF);
    }

    //% group="フェード"
    //% block="%color=colorNumberPicker"
    //% color.defl=0xff0000
    //% weight=770
    export function setcolors(color: number): number {
        return color;
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
