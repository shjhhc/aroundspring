package shjh.module.account.rest;

import org.springframework.web.bind.annotation.*;

/**
 * Created by m on 2016/11/23.
 */
@RestController
@RequestMapping("/rest")
public class Restful1Controller {
    @RequestMapping(value = "restful/{name}", name = "restful", method = RequestMethod.GET)
    public String restful(@PathVariable String name){
        return name;
    }

    @RequestMapping(value = "norestful", method = RequestMethod.GET)
    public String norestful(@RequestParam String name){
        return name;
    }
    @RequestMapping(value = "restful1/{name}", name = "restful", method = RequestMethod.GET)
    public String restful1(@PathVariable String name){
        return name;
    }

    @RequestMapping(value = "norestful1", method = RequestMethod.GET)
    public String norestful1(@RequestParam String name){
        return name;
    }
    @RequestMapping(value = "restful2/{name}", name = "restful", method = RequestMethod.GET)
    public String restful2(@PathVariable String name){
        return name;
    }

    @RequestMapping(value = "norestful2", method = RequestMethod.GET)
    public String norestful2(@RequestParam String name){
        return name;
    }
    @RequestMapping(value = "restful3/{name}", name = "restful", method = RequestMethod.GET)
    public String restful3(@PathVariable String name){
        return name;
    }

    @RequestMapping(value = "norestful3", method = RequestMethod.GET)
    public String norestful3(@RequestParam String name){
        return name;
    }
    @RequestMapping(value = "restful4/{name}", name = "restful", method = RequestMethod.GET)
    public String restful4(@PathVariable String name){
        return name;
    }

    @RequestMapping(value = "norestful4", method = RequestMethod.GET)
    public String norestful4(@RequestParam String name){
        return name;
    }
    @RequestMapping(value = "restful5/{name}", name = "restful", method = RequestMethod.GET)
    public String restful5(@PathVariable String name){
        return name;
    }

    @RequestMapping(value = "norestful5", method = RequestMethod.GET)
    public String norestful5(@RequestParam String name){
        return name;
    }
    @RequestMapping(value = "restful6/{name}", name = "restful", method = RequestMethod.GET)
    public String restful6(@PathVariable String name){
        return name;
    }

    @RequestMapping(value = "norestful6", method = RequestMethod.GET)
    public String norestful6(@RequestParam String name){
        return name;
    }
    @RequestMapping(value = "restful7/{name}", name = "restful", method = RequestMethod.GET)
    public String restful7(@PathVariable String name){
        return name;
    }

    @RequestMapping(value = "norestful7", method = RequestMethod.GET)
    public String norestful7(@RequestParam String name){
        return name;
    }
    @RequestMapping(value = "restful8/{name}", name = "restful", method = RequestMethod.GET)
    public String restful8(@PathVariable String name){
        return name;
    }

    @RequestMapping(value = "norestful8", method = RequestMethod.GET)
    public String norestful8(@RequestParam String name){
        return name;
    }
    @RequestMapping(value = "restful9/{name}", name = "restful", method = RequestMethod.GET)
    public String restful9(@PathVariable String name){
        return name;
    }

    @RequestMapping(value = "norestful9", method = RequestMethod.GET)
    public String norestful9(@RequestParam String name){
        return name;
    }
    @RequestMapping(value = "restful0/{name}", name = "restful", method = RequestMethod.GET)
    public String restful0(@PathVariable String name){
        return name;
    }

    @RequestMapping(value = "norestful0", method = RequestMethod.GET)
    public String norestful0(@RequestParam String name){
        return name;
    }
    @RequestMapping(value = "restful10/{name}", name = "restful", method = RequestMethod.GET)
    public String restful10(@PathVariable String name){
        return name;
    }

    @RequestMapping(value = "norestful10", method = RequestMethod.GET)
    public String norestful10(@RequestParam String name){
        return name;
    }
    @RequestMapping(value = "restful11/{name}", name = "restful", method = RequestMethod.GET)
    public String restful11(@PathVariable String name){
        return name;
    }

    @RequestMapping(value = "norestful11", method = RequestMethod.GET)
    public String norestful11(@RequestParam String name){
        return name;
    }
    @RequestMapping(value = "restful12/{name}", name = "restful", method = RequestMethod.GET)
    public String restful12(@PathVariable String name){
        return name;
    }

    @RequestMapping(value = "norestful12", method = RequestMethod.GET)
    public String norestful12(@RequestParam String name){
        return name;
    }
    @RequestMapping(value = "restful13/{name}", name = "restful", method = RequestMethod.GET)
    public String restful13(@PathVariable String name){
        return name;
    }

    @RequestMapping(value = "norestful13", method = RequestMethod.GET)
    public String norestful13(@RequestParam String name){
        return name;
    }
    @RequestMapping(value = "restful14/{name}", name = "restful", method = RequestMethod.GET)
    public String restful14(@PathVariable String name){
        return name;
    }

    @RequestMapping(value = "norestful14", method = RequestMethod.GET)
    public String norestful14(@RequestParam String name){
        return name;
    }
}
