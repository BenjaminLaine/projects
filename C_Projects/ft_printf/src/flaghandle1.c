/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   flaghandle1.c                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/12/13 19:22:09 by blaine            #+#    #+#             */
/*   Updated: 2020/01/30 22:29:22 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_printf.h"

void	ft_reset_flags(t_stf *stf)
{
	stf->width = -1;
	stf->pres = -1;
	ft_memset(stf->flags, 0, 6);
	ft_memset(stf->convert, 0, 3);
}

void	ft_get_flags(t_stf *stf)
{
	int digit;

	digit = 0;
	while (ft_charmequ(stf->str[stf->idx], "#0+- .hlL")
		|| (ft_isdigit(stf->str[stf->idx])))
	{
		(ft_isdigit(stf->str[stf->idx]) && stf->str[stf->idx] != '0') ? digit++
		: 1;
		stf->str[stf->idx] == '#' ? stf->flags[0] = '#' : 1;
		stf->str[stf->idx] == '+' ? stf->flags[1] = '+' : 1;
		stf->str[stf->idx] == '-' ? stf->flags[2] = '-' : 1;
		(stf->str[stf->idx] == '0' && digit == 0) ? stf->flags[3] = '0' : 1;
		stf->str[stf->idx] == ' ' ? stf->flags[4] = ' ' : 1;
		(ft_isdigit(stf->str[stf->idx]) && stf->width < 1)
		? (stf->width = ft_atoi(stf->str + (stf->idx))) : 1;
		stf->str[stf->idx] == '.' ? ft_dot(stf) : 1;
		(ft_charmequ(stf->str[stf->idx], "hlL")) ? ft_converts(stf) : 1;
		stf->idx++;
	}
}

void	make_struct(t_stf *stf, const char *str)
{
	stf->str = (char*)str;
	stf->printed = 0;
	stf->idx = 0;
	stf->width = -1;
	stf->pres = -1;
	ft_memset(stf->convert, 0, 3);
	ft_memset(stf->flags, 0, 6);
}

void	put_both(char **str, char *tmp_front, char *tmp_back)
{
	char *tmp;

	if (tmp_back && tmp_front)
	{
		tmp = ft_strdup(*str);
		ft_strdel(&*str);
		*str = ft_strjoin(tmp, tmp_back);
		tmp = ft_strdup(*str);
		ft_strdel(&*str);
		*str = ft_strjoin(tmp_front, tmp);
		ft_strdel(&tmp_front);
		ft_strdel(&tmp_back);
	}
	else if (tmp_back && !tmp_front)
	{
		tmp = ft_strdup(*str);
		ft_strdel(&*str);
		*str = ft_strjoin(tmp, tmp_back);
		ft_strdel(&tmp_back);
	}
	ft_strdel(&tmp);
}

void	ft_put_flags(t_stf *stf, char **str, int count, long long num)
{
	char	*tmp_front;
	char	*tmp_back;
	char	*tmp;

	tmp_back = ft_end_str(stf, num, count);
	if (num >= 0)
		tmp_front = ft_pos_front(stf, num, count);
	else
		tmp_front = ft_neg_front(stf, count, str);
	if (tmp_back && tmp_front)
		put_both(str, tmp_front, tmp_back);
	else if (tmp_back && !tmp_front)
		put_both(str, tmp_front, tmp_back);
	else if (!tmp_back && tmp_front)
	{
		tmp = ft_strdup(*str);
		ft_strdel(&*str);
		*str = ft_strjoin(tmp_front, tmp);
		ft_strdel(&tmp_front);
		ft_strdel(&tmp);
	}
}
