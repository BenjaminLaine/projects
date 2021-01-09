/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   width1.c                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.hive.fi>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/12/13 19:12:19 by blaine            #+#    #+#             */
/*   Updated: 2020/01/29 15:26:14 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_printf.h"

char	*ft_pos_sub1(t_stf *stf, int cnt)
{
	char	*front;
	int		max;

	max = (stf->width > (stf->pres + 1) && stf->flags[2] != '-')
	? (stf->width - cnt) : (stf->pres - cnt + 1);
	front = ft_strnew(max);
	ft_memset(front, '0', max);
	if (stf->width >= (stf->pres + 1) && stf->flags[2] != '-')
	{
		ft_memset(front, ' ', stf->width - (stf->pres + 1));
		front[stf->width - (stf->pres + 1)] = '+';
	}
	else if (stf->width >= (stf->pres + 1) && stf->flags[2] == '-')
		front[0] = '+';
	else if (stf->pres >= stf->width)
		front[0] = '+';
	return (front);
}

char	*ft_pos_sub2(t_stf *stf, int cnt)
{
	char	*front;
	int		max;

	max = (stf->width > stf->pres && stf->flags[2] != '-')
	? (stf->width - cnt) : (stf->pres - cnt);
	front = ft_strnew(max);
	ft_memset(front, '0', max);
	(stf->width > stf->pres) ? ft_memset(front, ' ', stf->width - stf->pres)
	: '\0';
	return (front);
}

char	*ft_pos_sub3(t_stf *stf, int cnt)
{
	char	*front;
	int		max;

	max = stf->width - cnt;
	front = ft_strnew(max);
	if (stf->flags[2] == '-')
		return (ft_strjoin("+", "\0"));
	(stf->flags[3] == '0') ? ft_memset(front, '0', max)
	: ft_memset(front, ' ', max);
	(stf->flags[3] == '0') ? (front[0] = '+')
	: (front[stf->width - cnt - 1] = '+');
	return (front);
}

char	*ft_pos_sub4(t_stf *stf, int cnt, int num)
{
	char	*front;
	int		max;

	if (stf->pres == 0 && num == 0)
		cnt = 0;
	max = stf->width - cnt;
	front = ft_strnew(max);
	if (stf->flags[2] == '-')
	{
		ft_strdel(&front);
		return (NULL);
	}
	(stf->flags[3] == '0') ? ft_memset(front, '0', max)
	: ft_memset(front, ' ', max);
	return (front);
}

char	*ft_pos_front(t_stf *stf, long long num, int cnt)
{
	(stf->flags[2] == '-' || stf->pres != -1) ? stf->flags[3] = '\0' : 1;
	if (cnt + 1 > stf->pres && cnt + 1 > stf->width
		&& stf->flags[1] == '+' && num > 0)
	{
		return (ft_strjoin("+", "\0"));
	}
	else if (cnt > stf->pres && cnt > stf->width && stf->flags[1] != '+')
		return (NULL);
	else if (stf->pres >= cnt && stf->flags[1] == '+')
		return (ft_pos_sub1(stf, cnt));
	else if (stf->pres >= cnt && stf->flags[1] != '+')
		return (ft_pos_sub2(stf, cnt));
	else if (stf->pres < cnt && stf->flags[1] == '+' && stf->width > cnt)
		return (ft_pos_sub3(stf, cnt));
	else if (stf->pres < cnt && stf->flags[1] != '+' && stf->width > cnt)
		return (ft_pos_sub4(stf, cnt, num));
	return (NULL);
}
